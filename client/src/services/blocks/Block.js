let Block = {
  create (type, id) {
    let b = document.createElement('block')
    b.setAttribute('type', type);
    b.setAttribute('id', id);
    return b;
  }
}

export default Block;
