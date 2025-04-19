/**
 * 管理后台主要JavaScript功能
 * 实现登录验证、多语言切换、页面导航和数据管理
 */

// 模拟产品数据
let products = [
    {
        id: 1,
        name: {
            'zh-CN': '小米手机13',
            'en-US': 'Xiaomi Phone 13',
            'id-ID': 'Xiaomi Phone 13'
        },
        price: 3999,
        originalPrice: 4299,
        stock: 42,
        category: 'phones',
        description: {
            'zh-CN': '骁龙8 Gen 2，徕卡光学镜头，超长续航',
            'en-US': 'Snapdragon 8 Gen 2, Leica optical lens, long battery life',
            'id-ID': 'Snapdragon 8 Gen 2, lensa optik Leica, baterai tahan lama'
        },
        images: ['images/product1.jpg'],
        isNew: true,
        isFlashSale: false
    },
    {
        id: 2,
        name: {
            'zh-CN': 'Redmi K60',
            'en-US': 'Redmi K60',
            'id-ID': 'Redmi K60'
        },
        price: 2999,
        originalPrice: 3299,
        stock: 38,
        category: 'phones',
        description: {
            'zh-CN': '高性能处理器，超清显示屏，快速充电',
            'en-US': 'High-performance processor, ultra-clear display, fast charging',
            'id-ID': 'Prosesor berkinerja tinggi, layar ultra jernih, pengisian cepat'
        },
        images: ['images/product2.jpg'],
        isNew: false,
        isFlashSale: true
    },
    {
        id: 3,
        name: {
            'zh-CN': '小米平板6 Pro',
            'en-US': 'Xiaomi Pad 6 Pro',
            'id-ID': 'Xiaomi Pad 6 Pro'
        },
        price: 2999,
        originalPrice: 3199,
        stock: 25,
        category: 'tablets',
        description: {
            'zh-CN': '高性能平板，120Hz高刷新率屏幕，全天续航',
            'en-US': 'High-performance tablet, 120Hz refresh rate screen, all-day battery life',
            'id-ID': 'Tablet berkinerja tinggi, layar refresh rate 120Hz, baterai tahan seharian'
        },
        images: ['images/product3.jpg'],
        isNew: true,
        isFlashSale: false
    }
];

// 产品分类
const categories = [
    { id: 'phones', name: { 'zh-CN': '手机', 'en-US': 'Phones', 'id-ID': 'Ponsel' } },
    { id: 'tablets', name: { 'zh-CN': '平板', 'en-US': 'Tablets', 'id-ID': 'Tablet' } },
    { id: 'laptops', name: { 'zh-CN': '笔记本', 'en-US': 'Laptops', 'id-ID': 'Laptop' } },
    { id: 'accessories', name: { 'zh-CN': '配件', 'en-US': 'Accessories', 'id-ID': 'Aksesoris' } },
    { id: 'smart_home', name: { 'zh-CN': '智能家居', 'en-US': 'Smart Home', 'id-ID': 'Rumah Pintar' } }
];

// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化应用
    initApp();
    
    // 初始化图表
    initCharts();
    
    // 绑定事件监听器
    bindEventListeners();
});

/**
 * 初始化应用
 */
function initApp() {
    // 检查登录状态
    checkLoginStatus();
    
    // 设置默认语言
    setLanguage(getPreferredLanguage());
}

/**
 * 检查用户登录状态
 */
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        // 未登录，重定向到登录页面
        window.location.href = 'login.html';
    }
}

/**
 * 绑定事件监听器
 */
function bindEventListeners() {
    // 退出登录
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // 语言切换
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage(this.getAttribute('data-lang'));
        });
    });
    
    // 页面导航
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.getAttribute('data-page'));
        });
    });
    
    // 访问网站链接
    const visitSiteLink = document.getElementById('visit-site');
    if (visitSiteLink) {
        visitSiteLink.href = '../index.html';
    }
}

/**
 * 处理退出登录
 * @param {Event} e - 点击事件
 */
function handleLogout(e) {
    e.preventDefault();
    
    // 清除登录状态
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // 重定向到登录页面
    window.location.href = 'login.html';
}

/**
 * 获取首选语言
 * @returns {string} 语言代码
 */
function getPreferredLanguage() {
    // 首先检查URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['zh-CN', 'en-US', 'id-ID'].includes(langParam)) {
        return langParam;
    }
    
    // 然后检查本地存储
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        return savedLang;
    }
    
    // 然后检查浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 根据浏览器语言返回支持的语言
    if (browserLang.startsWith('zh')) {
        return 'zh-CN';
    } else if (browserLang.startsWith('id')) {
        return 'id-ID';
    } else {
        return 'en-US'; // 默认英语
    }
}

/**
 * 设置界面语言
 * @param {string} lang - 语言代码
 */
function setLanguage(lang) {
    // 保存语言偏好
    localStorage.setItem('preferredLanguage', lang);
    
    // 更新所有带有data-i18n属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = getTranslation(key, lang);
    });
    
    // 更新语言下拉菜单显示
    updateLanguageDropdown(lang);
    
    // 更新页面标题
    document.title = `Xhobon ${getTranslation('dashboard', lang)}`;
}

/**
 * 更新语言下拉菜单显示
 * @param {string} lang - 当前语言代码
 */
function updateLanguageDropdown(lang) {
    const languageText = {
        'zh-CN': '中文',
        'en-US': 'English',
        'id-ID': 'Bahasa Indonesia'
    };
    
    const languageDropdown = document.getElementById('language-dropdown');
    if (languageDropdown) {
        const langSpan = languageDropdown.querySelector('span');
        if (langSpan) {
            langSpan.textContent = languageText[lang] || getTranslation('language', lang);
        }
    }
}

/**
 * 获取翻译文本
 * @param {string} key - 翻译键
 * @param {string} [lang] - 语言代码，如果未提供则使用当前语言
 * @returns {string} 翻译后的文本
 */
function getTranslation(key, lang) {
    // 如果未提供语言，使用当前语言
    const currentLang = lang || localStorage.getItem('preferredLanguage') || 'zh-CN';
    
    // 从翻译数据中获取文本
    try {
        return translations[currentLang][key] || key;
    } catch (e) {
        return key; // 如果找不到翻译，返回键名
    }
}

/**
 * 页面导航
 * @param {string} pageId - 目标页面ID
 */
function navigateTo(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        // 如果页面不存在，加载页面内容
        loadPageContent(pageId);
    }
    
    // 更新导航链接状态
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

/**
 * 加载页面内容
 * @param {string} pageId - 页面ID
 */
function loadPageContent(pageId) {
    // 创建页面容器
    const pageContainer = document.createElement('div');
    pageContainer.id = `${pageId}-page`;
    pageContainer.className = 'page-section active';
    
    // 添加加载指示器
    pageContainer.innerHTML = '<div class="loading"></div>';
    
    // 将页面添加到内容区域
    document.getElementById('page-content').appendChild(pageContainer);
    
    // 这里可以使用AJAX加载页面内容
    // 为了简化，我们直接生成一些基本内容
    setTimeout(() => {
        generatePageContent(pageId, pageContainer);
    }, 500);
}

/**
 * 生成页面内容
 * @param {string} pageId - 页面ID
 * @param {HTMLElement} container - 页面容器
 */
function generatePageContent(pageId, container) {
    let content = '';
    
    switch (pageId) {
        case 'products':
            content = generateProductsPage();
            break;
        case 'orders':
            content = generateOrdersPage();
            break;
        case 'customers':
            content = generateCustomersPage();
            break;
        case 'payments':
            content = generatePaymentsPage();
            break;
        case 'shipping':
            content = generateShippingPage();
            break;
        case 'settings':
            content = generateSettingsPage();
            break;
        default:
            content = `<h2 class="mb-4" data-i18n="${pageId}-title">${getTranslation(`${pageId}-title`)}</h2>
                      <div class="alert alert-info">
                          ${pageId} ${getTranslation('page-under-construction')}
                      </div>`;
    }
    
    container.innerHTML = content;
    
    // 更新新加载页面中的翻译
    const elements = container.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = getTranslation(key);
    });
    
    // 绑定页面特定的事件监听器
    bindPageSpecificEvents(pageId, container);
}

/**
 * 绑定页面特定的事件监听器
 * @param {string} pageId - 页面ID
 * @param {HTMLElement} container - 页面容器
 */
function bindPageSpecificEvents(pageId, container) {
    switch (pageId) {
        case 'products':
            bindProductsPageEvents(container);
            break;
        case 'orders':
            bindOrdersPageEvents(container);
            break;
        // 其他页面的事件绑定...
    }
}

/**
 * 绑定产品页面的事件监听器
 * @param {HTMLElement} container - 页面容器
 */
function bindProductsPageEvents(container) {
    // 添加产品按钮
    const addProductBtn = container.querySelector('.btn[data-i18n="add-product"]');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => showProductModal());
    }
    
    // 编辑产品按钮
    const editProductBtns = container.querySelectorAll('.btn[data-i18n="edit-product"]');
    editProductBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => showProductModal(products[index]));
    });
    
    // 删除产品按钮
    const deleteProductBtns = container.querySelectorAll('.btn[data-i18n="delete-product"]');
    deleteProductBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => confirmDeleteProduct(products[index]));
    });
}

/**
 * 显示产品模态框（添加/编辑）
 * @param {Object} [product] - 要编辑的产品，如果未提供则为添加新产品
 */
function showProductModal(product = null) {
    // 检查是否已存在模态框
    let productModal = document.getElementById('productModal');
    
    // 如果不存在，创建模态框
    if (!productModal) {
        const modalHTML = `
            <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="productModalLabel" data-i18n="${product ? 'edit-product' : 'add-product'}">${getTranslation(product ? 'edit-product' : 'add-product')}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="product-form" class="needs-validation" novalidate>
                                <input type="hidden" id="product-id" value="${product ? product.id : ''}">
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="product-price" class="form-label" data-i18n="product-price">产品价格</label>
                                        <div class="input-group">
                                            <span class="input-group-text">¥</span>
                                            <input type="number" class="form-control" id="product-price" value="${product ? product.price : ''}" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="product-original-price" class="form-label" data-i18n="product-original-price">原价</label>
                                        <div class="input-group">
                                            <span class="input-group-text">¥</span>
                                            <input type="number" class="form-control" id="product-original-price" value="${product ? product.originalPrice : ''}">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="product-stock" class="form-label" data-i18n="product-stock">库存数量</label>
                                        <input type="number" class="form-control" id="product-stock" value="${product ? product.stock : ''}" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="product-category" class="form-label" data-i18n="product-category">产品分类</label>
                                        <select class="form-select" id="product-category" required>
                                            ${generateCategoryOptions(product ? product.category : '')}
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="product-images" class="form-label" data-i18n="product-images">产品图片</label>
                                    <input type="file" class="form-control" id="product-images" multiple>
                                    <div class="mt-2" id="image-preview">
                                        ${product && product.images.length > 0 ? 
                                            `<img src="${product.images[0]}" class="img-thumbnail" style="max-height: 100px;" alt="Product image">` : ''}
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="product-is-new" ${product && product.isNew ? 'checked' : ''}>
                                            <label class="form-check-label" for="product-is-new" data-i18n="product-is-new">新品</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="product-is-flash-sale" ${product && product.isFlashSale ? 'checked' : ''}>
                                            <label class="form-check-label" for="product-is-flash-sale" data-i18n="product-is-flash-sale">限时特惠</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <h5 data-i18n="multilanguage-info">多语言信息</h5>
                                    <ul class="nav nav-tabs" id="languageTabs" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="zh-tab" data-bs-toggle="tab" data-bs-target="#zh-content" type="button" role="tab">中文</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="en-tab" data-bs-toggle="tab" data-bs-target="#en-content" type="button" role="tab">English</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="id-tab" data-bs-toggle="tab" data-bs-target="#id-content" type="button" role="tab">Bahasa Indonesia</button>
                                        </li>
                                    </ul>
                                    <div class="tab-content p-3 border border-top-0 rounded-bottom" id="languageTabsContent">
                                        <div class="tab-pane fade show active" id="zh-content" role="tabpanel">
                                            <div class="mb-3">
                                                <label class="form-label">产品名称 (中文)</label>
                                                <input type="text" class="form-control" id="product-name-zh" value="${product ? product.name['zh-CN'] : ''}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">产品描述 (中文)</label>
                                                <textarea class="form-control" id="product-description-zh" rows="3">${product ? product.description['zh-CN'] : ''}</textarea>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="en-content" role="tabpanel">
                                            <div class="mb-3">
                                                <label class="form-label">Product Name (English)</label>
                                                <input type="text" class="form-control" id="product-name-en" value="${product ? product.name['en-US'] : ''}">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Product Description (English)</label>
                                                <textarea class="form-control" id="product-description-en" rows="3">${product ? product.description['en-US'] : ''}</textarea>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="id-content" role="tabpanel">
                                            <div class="mb-3">
                                                <label class="form-label">Nama Produk (Bahasa Indonesia)</label>
                                                <input type="text" class="form-control" id="product-name-id" value="${product ? product.name['id-ID'] : ''}">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Deskripsi Produk (Bahasa Indonesia)</label>
                                                <textarea class="form-control" id="product-description-id" rows="3">${product ? product.description['id-ID'] : ''}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-i18n="cancel">取消</button>
                            <button type="button" class="btn btn-primary" id="save-product-btn" data-i18n="save-product">保存产品</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加模态框到页面
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        productModal = document.getElementById('productModal');
        
        // 绑定保存按钮事件
        const saveProductBtn = document.getElementById('save-product-btn');
        if (saveProductBtn) {
            saveProductBtn.addEventListener('click', saveProduct);
        }
        
        // 绑定图片预览事件
        const productImagesInput = document.getElementById('product-images');
        if (productImagesInput) {
            productImagesInput.addEventListener('change', previewProductImages);
        }
    } else {
        // 如果已存在，更新模态框标题和内容
        const modalTitle = productModal.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.setAttribute('data-i18n', product ? 'edit-product' : 'add-product');
            modalTitle.textContent = getTranslation(product ? 'edit-product' : 'add-product');
        }
        
        // 更新表单字段
        if (product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-original-price').value = product.originalPrice;
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-is-new').checked = product.isNew;
            document.getElementById('product-is-flash-sale').checked = product.isFlashSale;
            
            // 多语言字段
            document.getElementById('product-name-zh').value = product.name['zh-CN'];
            document.getElementById('product-description-zh').value = product.description['zh-CN'];
            document.getElementById('product-name-en').value = product.name['en-US'];
            document.getElementById('product-description-en').value = product.description['en-US'];
            document.getElementById('product-name-id').value = product.name['id-ID'];
            document.getElementById('product-description-id').value = product.description['id-ID'];
            
            // 图片预览
            const imagePreview = document.getElementById('image-preview');
            if (imagePreview && product.images.length > 0) {
                imagePreview.innerHTML = `<img src="${product.images[0]}" class="img-thumbnail" style="max-height: 100px;" alt="Product image">`;
            }
        } else {
            // 清空表单
            document.getElementById('product-form').reset();
            document.getElementById('product-id').value = '';
            document.getElementById('image-preview').innerHTML = '';
        }
    }
    
    // 显示模态框
    const modal = new bootstrap.Modal(productModal);
    modal.show();
}

/**
 * 生成分类选项
 * @param {string} selectedCategory - 当前选中的分类
 * @returns {string} HTML选项字符串
 */
function generateCategoryOptions(selectedCategory = '') {
    const currentLang = localStorage.getItem('preferredLanguage') || 'zh-CN';
    let options = '';
    
    categories.forEach(category => {
        const selected = category.id === selectedCategory ? 'selected' : '';
        options += `<option value="${category.id}" ${selected}>${category.name[currentLang]}</option>`;
    });
    
    return options;
}

/**
 * 预览产品图片
 * @param {Event} e - 文件输入事件
 */
function previewProductImages(e) {
    const files = e.target.files;
    const imagePreview = document.getElementById('image-preview');
    
    if (files.length > 0 && imagePreview) {
        imagePreview.innerHTML = '';
        
        for (let i = 0; i < Math.min(files.length, 3); i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.className = 'img-thumbnail me-2';
                img.style.maxHeight = '100px';
                imagePreview.appendChild(img);
            };
            
            reader.readAsDataURL(file);
        }
    }
}

/**
 * 保存产品
 */
function saveProduct() {
    // 获取表单数据
    const productId = document.getElementById('product-id').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const originalPrice = parseFloat(document.getElementById('product-original-price').value) || price;
    const stock = parseInt(document.getElementById('product-stock').value);
    const category = document.getElementById('product-category').value;
    const isNew = document.getElementById('product-is-new').checked;
    const isFlashSale = document.getElementById('product-is-flash-sale').checked;
    
    // 多语言数据
    const name = {
        'zh-CN': document.getElementById('product-name-zh').value,
        'en-US': document.getElementById('product-name-en').value || document.getElementById('product-name-zh').value,
        'id-ID': document.getElementById('product-name-id').value || document.getElementById('product-name-zh').value
    };
    
    const description = {
        'zh-CN': document.getElementById('product-description-zh').value,
        'en-US': document.getElementById('product-description-en').value || document.getElementById('product-description-zh').value,
        'id-ID': document.getElementById('product-description-id').value || document.getElementById('product-description-zh').value
    };
    
    // 验证必填字段
    if (!name['zh-CN'] || !price || !stock || !category) {
        showToast(getTranslation('please-fill-required-fields'), 'danger');
        return;
    }
    
    // 处理图片
    const imageFiles = document.getElementById('product-images').files;
    let images = [];
    
    // 如果是编辑现有产品且没有上传新图片，保留原图片
    if (productId && imageFiles.length === 0) {
        const existingProduct = products.find(p => p.id == productId);
        if (existingProduct) {
            images = existingProduct.images;
        }
    }
    
    // 在实际应用中，这里应该上传图片到服务器
    // 为了演示，我们使用模拟数据
    if (imageFiles.length > 0) {
        // 模拟图片路径
        images = ['images/product-new.jpg'];
    }
    
    // 创建产品对象
    const product = {
        id: productId ? parseInt(productId) : Date.now(),
        name,
        price,
        originalPrice,
        stock,
        category,
        description,
        images: images.length > 0 ? images : ['images/placeholder.jpg'],
        isNew,
        isFlashSale
    };
    
    // 保存产品
    if (productId) {
        // 更新现有产品
        const index = products.findIndex(p => p.id == productId);
        if (index !== -1) {
            products[index] = product;
        }
    } else {
        // 添加新产品
        products.push(product);
    }
    
    // 关闭模态框
    const productModal = document.getElementById('productModal');
    const modal = bootstrap.Modal.getInstance(productModal);
    modal.hide();
    
    // 刷新产品页面
    refreshProductsPage();
    
    // 显示成功消息
    showToast(getTranslation(productId ? 'product-updated' : 'product-added'), 'success');
}

/**
 * 确认删除产品
 * @param {Object} product - 要删除的产品
 */
function confirmDeleteProduct(product) {
    if (confirm(getTranslation('confirm-delete-product'))) {
        // 删除产品
        products = products.filter(p => p.id !== product.id);
        
        // 刷新产品页面
        refreshProductsPage();
        
        // 显示成功消息
        showToast(getTranslation('product-deleted'), 'success');
    }
}

/**
 * 刷新产品页面
 */
function refreshProductsPage() {
    const productsPage = document.getElementById('products-page');
    if (productsPage) {
        productsPage.innerHTML = generateProductsPage();
        bindProductsPageEvents(productsPage);
    }
}

/**
 * 显示提示消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型（success, danger, warning, info）
 */
function showToast(message, type = 'info') {
    // 检查是否已存在toast容器
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        // 创建toast容器
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // 创建toast元素
    const toastId = `toast-${Date.now()}`;
    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <span class="bg-${type} rounded me-2" style="width: 20px; height: 20px;"></span>
                <strong class="me-auto">${getTranslation('notification')}</strong>
                <small>${new Date().toLocaleTimeString()}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    // 添加toast到容器
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // 显示toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
    toast.show();
    
    // 自动移除toast
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

/**
 * 初始化图表
 */
function initCharts() {
    const salesChartCanvas = document.getElementById('salesChart');
    if (salesChartCanvas) {
        const ctx = salesChartCanvas.getContext('2d');
        
        // 销售数据
        const salesData = {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: getTranslation('sales'),
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(25, 118, 210, 0.2)',
                borderColor: 'rgba(25, 118, 210, 1)',
                borderWidth: 1
            }]
        };
        
        // 创建图表
        new Chart(ctx, {
            type: 'bar',
            data: salesData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

/**
 * 生成产品页面内容
 * @returns {string} HTML内容
 */
function generateProductsPage() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'zh-CN';
    
    let productCards = '';
    products.forEach(product => {
        productCards += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    ${product.images.length > 0 ? 
                        `<img src="${product.images[0]}" class="card-img-top" alt="${product.name[currentLang]}">` : 
                        '<div class="card-img-top bg-light text-center py-5"><i class="bi bi-image fs-1"></i></div>'}
                    <div class="card-body">
                        <h5 class="card-title">${product.name[currentLang]}</h5>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <p class="card-text text-primary mb-0">¥${product.price}</p>
                            ${product.originalPrice > product.price ? 
                                `<p class="card-text text-muted mb-0"><del>¥${product.originalPrice}</del></p>` : ''}
                        </div>
                        <p class="card-text"><small class="text-muted">${getTranslation('stock')}: ${product.stock}</small></p>
                        <p class="card-text">${product.description[currentLang]}</p>
                        <div class="d-flex gap-1 mb-2">
                            ${product.isNew ? 
                                `<span class="badge bg-success">${getTranslation('new-product')}</span>` : ''}
                            ${product.isFlashSale ? 
                                `<span class="badge bg-danger">${getTranslation('flash-sale')}</span>` : ''}
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <div class="btn-group w-100">
                            <button class="btn btn-sm btn-outline-primary" data-i18n="edit-product">编辑</button>
                            <button class="btn btn-sm btn-outline-danger" data-i18n="delete-product">删除</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 data-i18n="products">产品</h2>
            <button class="btn btn-primary" data-i18n="add-product">添加产品</button>
        </div>
        
        <div class="card mb-4">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="bi bi-search me-1"></i>
                        <span data-i18n="product-filter">产品筛选</span>
                    </div>
                    <div class="d-flex gap-2">
                        <select class="form-select form-select-sm" id="category-filter">
                            <option value="" data-i18n="all-categories">所有分类</option>
                            ${generateCategoryOptions()}
                        </select>
                        <select class="form-select form-select-sm" id="sort-order">
                            <option value="name" data-i18n="sort-by-name">按名称排序</option>
                            <option value="price-asc" data-i18n="sort-by-price-asc">价格从低到高</option>
                            <option value="price-desc" data-i18n="sort-by-price-desc">价格从高到低</option>
                            <option value="stock" data-i18n="sort-by-stock">按库存排序</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            ${productCards}
        </div>
    `;
}

/**
 * 生成订单页面内容
 * @returns {string} HTML内容
 */
function generateOrdersPage() {
    return `
        <h2 class="mb-4" data-i18n="orders">订单</h2>
        
        <div class="card mb-4">
            <div class="card-header">
                <i class="bi bi-cart3 me-1"></i>
                <span data-i18n="recent-orders">最近订单</span>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th data-i18n="order-id">订单号</th>
                                <th data-i18n="customer">客户</th>
                                <th data-i18n="date">日期</th>
                                <th data-i18n="status">状态</th>
                                <th data-i18n="amount">金额</th>
                                <th data-i18n="action">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#1234</td>
                                <td>张三</td>
                                <td>2025-04-18</td>
                                <td><span class="badge bg-success" data-i18n="completed">已完成</span></td>
                                <td>¥1,200</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#1235</td>
                                <td>李四</td>
                                <td>2025-04-18</td>
                                <td><span class="badge bg-warning" data-i18n="processing">处理中</span></td>
                                <td>¥850</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#1236</td>
                                <td>王五</td>
                                <td>2025-04-17</td>
                                <td><span class="badge bg-info" data-i18n="shipped">已发货</span></td>
                                <td>¥2,100</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#1237</td>
                                <td>赵六</td>
                                <td>2025-04-17</td>
                                <td><span class="badge bg-danger" data-i18n="cancelled">已取消</span></td>
                                <td>¥950</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#1238</td>
                                <td>钱七</td>
                                <td>2025-04-16</td>
                                <td><span class="badge bg-success" data-i18n="completed">已完成</span></td>
                                <td>¥3,450</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

/**
 * 生成客户页面内容
 * @returns {string} HTML内容
 */
function generateCustomersPage() {
    return `
        <h2 class="mb-4" data-i18n="customers">客户</h2>
        
        <div class="card mb-4">
            <div class="card-header">
                <i class="bi bi-people me-1"></i>
                <span data-i18n="customer-list">客户列表</span>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th data-i18n="name">姓名</th>
                                <th data-i18n="email">邮箱</th>
                                <th data-i18n="phone">电话</th>
                                <th data-i18n="orders">订单数</th>
                                <th data-i18n="total-spent">消费总额</th>
                                <th data-i18n="action">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>张三</td>
                                <td>zhangsan@example.com</td>
                                <td>13800138000</td>
                                <td>5</td>
                                <td>¥6,800</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>李四</td>
                                <td>lisi@example.com</td>
                                <td>13900139000</td>
                                <td>3</td>
                                <td>¥4,200</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>王五</td>
                                <td>wangwu@example.com</td>
                                <td>13700137000</td>
                                <td>2</td>
                                <td>¥3,100</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">查看</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

/**
 * 生成支付设置页面内容
 * @returns {string} HTML内容
 */
function generatePaymentsPage() {
    return `
        <h2 class="mb-4" data-i18n="payments">支付设置</h2>
        
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <i class="bi bi-credit-card me-1"></i>
                        <span data-i18n="payment-methods">支付方式</span>
                    </div>
                    <div class="card-body">
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="alipay-switch" checked>
                                    <label class="form-check-label" for="alipay-switch">
                                        <img src="images/alipay.svg" alt="Alipay" height="24" class="me-2">
                                        支付宝
                                    </label>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="wechat-switch" checked>
                                    <label class="form-check-label" for="wechat-switch">
                                        <img src="images/wechat.svg" alt="WeChat Pay" height="24" class="me-2">
                                        微信支付
                                    </label>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="paypal-switch" checked>
                                    <label class="form-check-label" for="paypal-switch">
                                        <img src="images/paypal.svg" alt="PayPal" height="24" class="me-2">
                                        PayPal
                                    </label>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="creditcard-switch" checked>
                                    <label class="form-check-label" for="creditcard-switch">
                                        <i class="bi bi-credit-card me-2"></i>
                                        信用卡
                                    </label>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="indo-switch" checked>
                                    <label class="form-check-label" for="indo-switch">
                                        <i class="bi bi-currency-exchange me-2"></i>
                                        印尼本地支付
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" data-i18n="save-settings">保存设置</button>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <i class="bi bi-gear me-1"></i>
                        <span data-i18n="payment-settings">支付配置</span>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="currency" class="form-label" data-i18n="default-currency">默认货币</label>
                                <select class="form-select" id="currency">
                                    <option value="CNY" selected>人民币 (CNY)</option>
                                    <option value="USD">美元 (USD)</option>
                                    <option value="IDR">印尼盾 (IDR)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="tax-rate" class="form-label" data-i18n="tax-rate">税率</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="tax-rate" value="13">
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="show-tax" checked>
                                <label class="form-check-label" for="show-tax" data-i18n="show-tax">在结账页面显示税费</label>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="enable-coupons" checked>
                                <label class="form-check-label" for="enable-coupons" data-i18n="enable-coupons">启用优惠券</label>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" data-i18n="save-settings">保存设置</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 生成物流设置页面内容
 * @returns {string} HTML内容
 */
function generateShippingPage() {
    return `
        <h2 class="mb-4" data-i18n="shipping">物流设置</h2>
        
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <i class="bi bi-truck me-1"></i>
                        <span data-i18n="shipping-methods">物流方式</span>
                    </div>
                    <div class="card-body">
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="express-switch" checked>
                                    <label class="form-check-label" for="express-switch">
                                        <i class="bi bi-lightning-charge me-2"></i>
                                        快递
                                    </label>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="standard-switch" checked>
                                    <label class="form-check-label" for="standard-switch">
                                        <i class="bi bi-truck me-2"></i>
                                        标准配送
                                    </label>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="international-switch" checked>
                                    <label class="form-check-label" for="international-switch">
                                        <i class="bi bi-globe me-2"></i>
                                        国际物流
                                    </label>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="pickup-switch" checked>
                                    <label class="form-check-label" for="pickup-switch">
                                        <i class="bi bi-shop me-2"></i>
                                        门店自提
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" data-i18n="save-settings">保存设置</button>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <i class="bi bi-geo-alt me-1"></i>
                        <span data-i18n="shipping-regions">配送区域</span>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="default-region" class="form-label" data-i18n="default-region">默认区域</label>
                                <select class="form-select" id="default-region">
                                    <option value="CN" selected>中国</option>
                                    <option value="ID">印度尼西亚</option>
                                    <option value="US">美国</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="shipping-fee" class="form-label" data-i18n="shipping-fee">基础运费</label>
                                <div class="input-group">
                                    <span class="input-group-text">¥</span>
                                    <input type="number" class="form-control" id="shipping-fee" value="10">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="free-shipping-threshold" class="form-label" data-i18n="free-shipping-threshold">免运费阈值</label>
                                <div class="input-group">
                                    <span class="input-group-text">¥</span>
                                    <input type="number" class="form-control" id="free-shipping-threshold" value="99">
                                </div>
                                <div class="form-text" data-i18n="free-shipping-threshold-hint">订单金额超过此值将免运费</div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="enable-tracking" checked>
                                <label class="form-check-label" for="enable-tracking" data-i18n="enable-tracking">启用物流跟踪</label>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" data-i18n="save-settings">保存设置</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 生成网站设置页面内容
 * @returns {string} HTML内容
 */
function generateSettingsPage() {
    return `
        <h2 class="mb-4" data-i18n="settings">网站设置</h2>
        
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <i class="bi bi-info-circle me-1"></i>
                        <span data-i18n="basic-info">基本信息</span>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="site-name" class="form-label" data-i18n="site-name">网站名称</label>
                                <input type="text" class="form-control" id="site-name" value="Xhobon">
                            </div>
                            <div class="mb-3">
                                <label for="site-description" class="form-label" data-i18n="site-description">网站描述</label>
                                <textarea class="form-control" id="site-description" rows="3">Xhobon官方网站，提供小米风格的产品和服务。</textarea>
                            </div>
                            <div class="mb-3">
                                <label for="site-logo" class="form-label" data-i18n="site-logo">网站Logo</label>
                                <input type="file" class="form-control" id="site-logo">
                            </div>
                            <div class="mb-3">
                                <label for="contact-email" class="form-label" data-i18n="contact-email">联系邮箱</label>
                                <input type="email" class="form-control" id="contact-email" value="contact@xhobon.com">
                            </div>
                            <div class="mb-3">
                                <label for="contact-phone" class="form-label" data-i18n="contact-phone">联系电话</label>
                                <input type="tel" class="form-control" id="contact-phone" value="+86 400-100-5678">
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" data-i18n="save-settings">保存设置</button>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <i class="bi bi-share me-1"></i>
                        <span data-i18n="social-media">社交媒体</span>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="facebook" class="form-label">Facebook</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-facebook"></i></span>
                                    <input type="text" class="form-control" id="facebook" value="https://facebook.com/xhobon">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="twitter" class="form-label">Twitter</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-twitter"></i></span>
                                    <input type="text" class="form-control" id="twitter" value="https://twitter.com/xhobon">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="instagram" class="form-label">Instagram</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-instagram"></i></span>
                                    <input type="text" class="form-control" id="instagram" value="https://instagram.com/xhobon">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="youtube" class="form-label">YouTube</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-youtube"></i></span>
                                    <input type="text" class="form-control" id="youtube" value="https://youtube.com/xhobon">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="weibo" class="form-label">微博</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-sina-weibo"></i></span>
                                    <input type="text" class="form-control" id="weibo" value="https://weibo.com/xhobon">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" data-i18n="save-settings">保存设置</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
