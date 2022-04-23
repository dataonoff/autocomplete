/**
 * Helpers function used for the AutocompleteTextArea Component
 */


/**
* Return the current caret position inside the contenteditable div 
*/
export const getCaretPosition = (element: any) => {
    let caretOffset = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection !== "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type !== "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

/**
* Set the caret position in a specific position is a specific node inside the contenteditable div 
*/
export const setCaretPosition = (element: HTMLElement, position: number) => {
    const range = document.createRange()
    const sel = window.getSelection()
    console.log(element.childNodes);
    if (element.childNodes[position]) {
        range.setStart(element.childNodes[position], 1)
        range.collapse(true)
        sel?.removeAllRanges()
        sel?.addRange(range)
    }
}

/**
* Return the current nodeElement manipulated in dom
*/
export const getCurrentNode = () => {
    const node = document?.getSelection()?.anchorNode;
    return (node?.nodeType === 3 ? node.parentNode : node);
}


/**
* Return the current caret position inside the innerHtml of the contenteditable div 
*/
export const getInnerHtmlPosition = (el: any) => {
    let target = document.createTextNode("\u0001");
    document?.getSelection()?.getRangeAt(0).insertNode(target);
    let position = el.innerHTML.indexOf("\u0001");
    target?.parentNode?.removeChild(target)
    return position;
}
