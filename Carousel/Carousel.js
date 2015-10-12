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

var Carousel = function(items, viewport, itemWidth, container) {
    if (items.length === 0 || !container || !items)
        throw new ReferenceError();
    if (itemWidth <= 0)
        throw new RangeError();

    var self = this;
    var itemsPerPage = 3;
    var arrowWidth = 45;
    viewport = viewport || "900";
    viewport -= 2 * arrowWidth;
    
    var borederWidth = 5;
    var paddingWidth = 5;
    if (viewport < (itemWidth + 2 * (borederWidth + paddingWidth)) * itemsPerPage)
        throw new RangeError();

    var marginWidth = ((viewport / 3) - itemWidth - 2 * borederWidth - 2 * paddingWidth) / 2;
    var additionalWidth = (borederWidth + paddingWidth + marginWidth) * 2;
    
    this.data = items;
    this.selectedItem = 0;
    this.currentShiftView = 0;
    this.firstVisible = 0;
    this.lastVisible =  items.length > itemsPerPage ? itemsPerPage - 1 : items.length - 1;

    var createItem = function(img_src, description) {
        var item, img, p, margin;
        item = document.createElement('li');
        item.classList.add('carousel-item');
        item.style.marginLeft = marginWidth + "px";
        item.style.marginRight = marginWidth + "px";
        img = document.createElement('img');
        img.setAttribute('src', img_src);
        img.style.width = itemWidth;
        p = document.createElement('p');
        p.innerHTML = description;
        p.style.width = itemWidth;
        item.appendChild(img);
        item.appendChild(p);
        return item;
    };

    var createItems = function (dataArray) {
        var i, items = [];
        for (i = 0; i < dataArray.length; i++) {
            items.push(createItem(dataArray[i].img_src, dataArray[i].description));
        }
        items[0].classList.add("carousel-item-selected");
        return items;
    };

    var createItemContainer = function(items) {
        var itemContainer = document.createElement('ul');
        itemContainer.classList.add('carousel-item-container');
        itemContainer.style.width = (itemWidth + additionalWidth) * items.length;
        for (i = 0; i < items.length; i++) {
            itemContainer.appendChild(items[i]);
        }
        return itemContainer;
    };

    var createView = function(itemContainer) {
        var view = document.createElement("div");
        view.classList.add("carousel-view");
        view.appendChild(itemContainer);
        return view;
    }

    var createPrevButton = function() {
        var prevButton = document.createElement('div');
        prevButton.innerHTML = "&#9668;";
        prevButton.classList.add("carousel-arrow");
        prevButton.classList.add("carousel-arrow-left");
        prevButton.addEventListener("click", function() {
            if (self.selectedItem === 0)
                return;
            self.items[self.selectedItem].classList.remove("carousel-item-selected");
            self.selectedItem--;
            self.items[self.selectedItem].classList.add("carousel-item-selected");
            if (self.selectedItem < self.firstVisible){
                self.currentShiftView += (itemWidth + additionalWidth);
                self.itemContainer.style.transform = "translateX(" + self.currentShiftView + "px)";
                self.lastVisible--;
                self.firstVisible--;
            }
        });
        return prevButton;
    }

    var createNextButton = function() {
        var nextButton = document.createElement('div');
        nextButton.innerHTML = "&#9658;";   
        nextButton.classList.add("carousel-arrow");
        nextButton.classList.add("carousel-arrow-right");
        nextButton.addEventListener("click", function() {
            if (self.selectedItem >= self.items.length - 1)
                return;
            self.items[self.selectedItem].classList.remove("carousel-item-selected");
            self.selectedItem++;
            self.items[self.selectedItem].classList.add("carousel-item-selected");
            if (self.selectedItem > self.lastVisible){
                self.currentShiftView += -(itemWidth + additionalWidth);
                self.itemContainer.style.transform = "translateX(" + self.currentShiftView + "px)";
                self.lastVisible++;
                self.firstVisible++;
            }
        });
        return nextButton;
    }

    this.items = createItems(items);
    this.itemContainer = createItemContainer(this.items);

    var carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container")
    //carouselContainer.style.width = (itemWidth + additionalWidth) * itemsPerPage;
    carouselContainer.style.width = viewport;

    carouselContainer.appendChild(createView(this.itemContainer));
    carouselContainer.appendChild(createPrevButton());
    carouselContainer.appendChild(createNextButton());

    container.appendChild(carouselContainer);
}


window.addEventListener("load", function() {
    new Carousel(getItmes(), 750, 200, document.getElementById('container'));
});
