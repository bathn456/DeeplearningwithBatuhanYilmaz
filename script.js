// Algorithm Data with Scientific Metadata
const algorithms = [
    {
        title: "Multi-Head Self-Attention",
        image: "Multi Head Self Attention.jpg",
        category: "Transformers",
        complexity: "advanced",
        equation: "Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V",
        tags: ["Attention", "NLP", "Parallelization"],
        description: "Parallel attention mechanism enabling models to jointly attend to information from different representation subspaces."
    },
    {
        title: "Embedding Similarity",
        image: "Embedding Similarity.jpg",
        category: "Vector Space",
        complexity: "intermediate",
        equation: "cos(θ) = (A · B) / (‖A‖ ‖B‖)",
        tags: ["Cosine Similarity", "Embeddings", "Semantics"],
        description: "Measuring semantic similarity between vector representations in high-dimensional space."
    },
    {
        title: "CNN Output Layer",
        image: "CNN Output Layer.jpg",
        category: "Computer Vision",
        complexity: "intermediate",
        equation: "σ(zᵢ) = eᶻⁱ / Σⱼ eᶻʲ",
        tags: ["Softmax", "Classification", "Probability"],
        description: "Final classification layer converting logits to probability distribution over classes."
    },
    {
        title: "Batch Normalization",
        image: "BATCH logic.jpg",
        category: "Optimization",
        complexity: "advanced",
        equation: "BN(x) = γ · (x - μ) / σ + β",
        tags: ["Normalization", "Training Stability", "Internal Covariate Shift"],
        description: "Normalizing layer inputs to accelerate training and reduce sensitivity to initialization."
    },
    {
        title: "CNN Architecture",
        image: "CNN logic.jpg",
        category: "Computer Vision",
        complexity: "fundamental",
        equation: "Y = f(W * X + b)",
        tags: ["Convolution", "Feature Maps", "Spatial Hierarchy"],
        description: "Hierarchical feature extraction through learnable convolutional filters."
    },
    {
        title: "Kernel Operations",
        image: "KERNEL logic.jpg",
        category: "Computer Vision",
        complexity: "fundamental",
        equation: "(f * g)(t) = ∫ f(τ)g(t-τ)dτ",
        tags: ["Convolution", "Filters", "Feature Detection"],
        description: "Sliding window operations for local pattern detection in images."
    },
    {
        title: "Optimization Algorithms",
        image: "Optimizers.jpg",
        category: "Optimization",
        complexity: "advanced",
        equation: "θₜ₊₁ = θₜ - α · ∇J(θₜ)",
        tags: ["SGD", "Adam", "Momentum", "Learning Rate"],
        description: "Gradient-based methods for minimizing the loss function during training."
    },
    {
        title: "ReLU Activation",
        image: "RELU logic.jpg",
        category: "Activation Functions",
        complexity: "fundamental",
        equation: "f(x) = max(0, x)",
        tags: ["Non-linearity", "Gradient Flow", "Sparse Activation"],
        description: "Rectified Linear Unit introducing non-linearity while maintaining efficient gradient flow."
    },
    {
        title: "Residual Connections",
        image: "residualconnection.jpg",
        category: "Network Architecture",
        complexity: "advanced",
        equation: "H(x) = F(x) + x",
        tags: ["Skip Connections", "Deep Networks", "Gradient Highway"],
        description: "Identity shortcuts enabling training of very deep networks by facilitating gradient flow."
    }
];

// DOM Elements
const grid = document.getElementById('algorithm-grid');
const searchInput = document.getElementById('search-input');
const filterTags = document.querySelectorAll('.filter-tag');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxEquation = document.getElementById('lightbox-equation');
const lightboxDesc = document.getElementById('lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');
const algorithmCount = document.getElementById('algorithm-count');

let currentFilter = 'all';

// Render Algorithm Cards
function renderCards(items) {
    grid.innerHTML = '';

    items.forEach((algo, index) => {
        const card = document.createElement('div');
        card.className = 'algorithm-card';
        card.style.animationDelay = `${index * 0.08}s`;

        card.innerHTML = `
            <div class="card-image">
                <img src="${algo.image}" alt="${algo.title}" loading="lazy">
                <span class="complexity-badge ${algo.complexity}">${algo.complexity}</span>
            </div>
            <div class="card-body">
                <div class="card-category">${algo.category}</div>
                <h3 class="card-title">${algo.title}</h3>
                <div class="card-equation">${algo.equation}</div>
                <div class="card-tags">
                    ${algo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => openLightbox(algo));
        grid.appendChild(card);
    });

    algorithmCount.textContent = items.length;
}

// Open Lightbox
function openLightbox(algo) {
    lightboxImg.src = algo.image;
    lightboxTitle.textContent = algo.title;
    lightboxEquation.textContent = algo.equation;
    lightboxDesc.textContent = algo.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Search & Filter
function filterAlgorithms() {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = algorithms.filter(algo => {
        const matchesSearch =
            algo.title.toLowerCase().includes(searchTerm) ||
            algo.category.toLowerCase().includes(searchTerm) ||
            algo.equation.toLowerCase().includes(searchTerm) ||
            algo.tags.some(tag => tag.toLowerCase().includes(searchTerm));

        const matchesFilter =
            currentFilter === 'all' ||
            algo.category === currentFilter;

        return matchesSearch && matchesFilter;
    });

    renderCards(filtered);
}

searchInput.addEventListener('input', filterAlgorithms);

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        currentFilter = tag.dataset.filter;
        filterAlgorithms();
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    document.querySelector('.scroll-progress').style.width = `${scrolled}%`;
});

// Initialize
renderCards(algorithms);
