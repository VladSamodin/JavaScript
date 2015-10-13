var getItmes = function() {
    return [
            {
                "img_src" : "img/DSCN0027.jpg",
                "description" : "Text 1"
            },
            {
                "img_src" : "img/DSCN0036.jpg",
                "description" : "Text 2"
            },
            {
                "img_src" : "img/DSCN0118.jpg",
                "description" : "Text 3"
            },
            {
                "img_src" : "img/DSCN0321a.jpg",
                "description" : "Text 4"
            },
            {
                "img_src" : "img/IMG_2365.jpg",
                "description" : "Text 5"
            },
            {
                "img_src" : "img/PlanePair2.jpg",
                "description" : "Text 6"
            }
        ];
}

var bindMethod = function(o, f) {
    return function() { return f.apply(o, arguments);};
};

var Carousel = function(items, viewport, itemWidth, container) {
    if (items.length === 0 || !container || !items)
        throw new ReferenceError();
    if (itemWidth <= 0)
        throw new RangeError();
    if (viewport < 1)
        throw new RangeError();

    var arrowWidth = 45;

    var borederWidth = 5;
    var paddingWidth = 5;
    var marginWidth = 5;
    var additionalWidth = (borederWidth + paddingWidth + marginWidth) * 2;

    this.selectedItem = 0;
    this.currentShiftView = 0;
    this.firstVisible = 0;
    this.lastVisible =  items.length > itemsPerPage ? itemsPerPage - 1 : items.length - 1;

    this.data = items;
    this.itemWidth = itemWidth;
    this.container = container;
    this.itemsPerPage = viewport;
    this.arrowWidth = arrowWidth;
    this.borederWidth = borederWidth;
    this.paddingWidth = paddingWidth;
    this.marginWidth = marginWidth;
    this.additionalWidth = additionalWidth;
}

Carousel.prototype.next = function() {
    if (this.selectedItem >= this.items.length - 1)
        return;
    this.items[this.selectedItem].classList.remove("carousel-item-selected");
    this.selectedItem++;
    this.items[this.selectedItem].classList.add("carousel-item-selected");
    if (this.selectedItem > this.lastVisible) {
        this.currentShiftView += -(this.itemWidth + this.additionalWidth);
        this.itemContainer.style.transform = "translateX(" + this.currentShiftView + "px)";
        this.lastVisible++;
        this.firstVisible++;
    }
};

Carousel.prototype.prev = function() {
    if (this.selectedItem === 0)
        return;
    this.items[this.selectedItem].classList.remove("carousel-item-selected");
    this.selectedItem--;
    this.items[this.selectedItem].classList.add("carousel-item-selected");
    if (this.selectedItem < this.firstVisible) {
        this.currentShiftView += (this.itemWidth + this.additionalWidth);
        this.itemContainer.style.transform = "translateX(" + this.currentShiftView + "px)";
        this.lastVisible--;
        this.firstVisible--;
    }
};

Carousel.prototype._createItem = function(img_src, description) {
    var item, img, p;
    item = document.createElement('li');
    item.classList.add('carousel-item');
    item.style.marginLeft = this.marginWidth + "px";
    item.style.marginRight = this.marginWidth + "px";
    img = document.createElement('img');
    img.setAttribute('src', img_src);
    img.style.width = this.itemWidth;
    p = document.createElement('p');
    p.innerHTML = description;
    p.style.width = this.itemWidth;
    item.appendChild(img);
    item.appendChild(p);
    return item;
};

Carousel.prototype._createItems = function (dataArray) {
    var i, items = [];
    for (i = 0; i < dataArray.length; i++) {
        items.push(this._createItem(dataArray[i].img_src, dataArray[i].description));
    }
    items[0].classList.add("carousel-item-selected");
    return items;
};

Carousel.prototype._createItemContainer = function(items) {
    var itemContainer = document.createElement('ul');
    itemContainer.classList.add('carousel-item-container');
    itemContainer.style.width = (this.itemWidth + this.additionalWidth) * items.length;
    for (i = 0; i < items.length; i++) {
        itemContainer.appendChild(items[i]);
    }
    return itemContainer;
};

Carousel.prototype._createView = function(itemContainer) {
    var view = document.createElement("div");
    view.classList.add("carousel-view");
    view.appendChild(itemContainer);
    return view;
};

Carousel.prototype._createPrevButton = function() {
    var prevButton = document.createElement('div');
    prevButton.innerHTML = "&#9668;";
    prevButton.classList.add("carousel-arrow");
    prevButton.classList.add("carousel-arrow-left");
    prevButton.addEventListener("click", bindMethod(this, Carousel.prototype.prev));
    return prevButton;
};

Carousel.prototype._createNextButton = function() {
    var nextButton = document.createElement('div');
    nextButton.innerHTML = "&#9658;";   
    nextButton.classList.add("carousel-arrow");
    nextButton.classList.add("carousel-arrow-right");
    nextButton.addEventListener("click", bindMethod(this, Carousel.prototype.next));
    return nextButton;
};

Carousel.prototype.build = function() {
    this.items = this._createItems(this.data);
    this.itemContainer = this._createItemContainer(this.items);

    var carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container")
    carouselContainer.style.width = (this.itemWidth + this.additionalWidth) * this.itemsPerPage; 

    carouselContainer.appendChild(this._createView(this.itemContainer));
    carouselContainer.appendChild(this._createPrevButton());
    carouselContainer.appendChild(this._createNextButton());

    this.container.appendChild(carouselContainer);
};



window.addEventListener("load", function() {
    var carusel = new Carousel(getItmes(), 1, 200, document.getElementById('container'));
    carusel.build();
});
