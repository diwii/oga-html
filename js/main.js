/**
 * Izveidojam objektu ar metodēm kuras pievieno vai noņem css klases.
 */
class Element
{
    visible;
    element;
    className;

    constructor (element, visible=false, className=false)
    {
        this.element = element;
        this.visible = visible;
        this.className = className;
    }

    show(){
        this.visible = true;
        if (this.className) {
            // Izmanto šo ceļu, lai pievienotu klasi kura atklāj elementu.
            this.element.classList.add(this.className);
        } else {
            this.element.classList.remove('hidden');
        }
    }

    hide(){
        this.visible = false;
        if (this.className) {
            this.element.classList.remove(this.className);
        } else {
            this.element.classList.add('hidden');
        }
    }
}

// Deklarējam objektus.
var mainMenu = new Element(document.querySelector('#mainMenu'), false, 'visible');
var openIcon = new Element(document.querySelector('#openIcon'));
var closeIcon = new Element(document.querySelector('#closeIcon'));
var menuButton = new Element(document.querySelector('#menuButton'));

function action()
{
    if (mainMenu.visible) {
        hideMenu();
    } else {
        showMenu();
    }
}

function hideMenu()
{
    mainMenu.hide();
    openIcon.show();
    closeIcon.hide();
}

function showMenu()
{
    mainMenu.show();
    openIcon.hide();
    closeIcon.show();
}

window.addEventListener('resize', function(){
    let width = window.matchMedia('(min-width:415px)');

    if (width.matches){
        hideMenu();
        mainMenu.show();
    } else {
        hideMenu();
    }
});

