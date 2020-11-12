import {Tag} from "./elements";

export class RenderEngine {
    private rootElement: Tag;
    private target: HTMLElement;

    constructor(rootElement: Tag, target: HTMLElement) {
        this.rootElement = rootElement;
        this.target = target;
    }

    initialRender() {
        const fragment = document.createDocumentFragment();
        const el = this.rootElement;
        fragment.appendChild(this.createDomElement(el));
        this.target.appendChild(fragment);
    }


    private createDomElement(el: Tag) {
        const domEl = document.createElement(el.tag)
        if (el.children) {
            el.children.forEach( childEl => {
                if("string" === typeof childEl) {
                    domEl.appendChild(document.createTextNode(childEl))
                } else {
                    domEl.appendChild(this.createDomElement(childEl))
                }
            });
        }
        if (el.attr) {
            if (el.attr.class) {domEl.className = el.attr.class;}

            for(const key in el.attr.style) {
                domEl.style[key] = el.attr.style[key]
            }
        }
        return domEl;
    }
}