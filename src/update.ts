function add(item:string){
    const customEvent = new CustomEvent("add", {
      detail: item,
    });
    window.dispatchEvent(customEvent);
  }

function remove(idx:number){
    const customEvent = new CustomEvent("subtract", {
      detail: idx,
    });
    window.dispatchEvent(customEvent);

}

function change(idx:number,item:string){
    const customEvent = new CustomEvent("change", {
      detail: [idx,item]
    });
    window.dispatchEvent(customEvent);
}