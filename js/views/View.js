export default class View {
  _data;

  render(data, render = true) {
    try {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new Error("Invalid DATA");
      }
      if (!render) return;
      this._data = data;
      const markup = this._generateMarkup();
      if (!render) return markup;
      this._clear();
      this._parentElement.insertAdjacentHTML("afterbegin", markup);
    } catch (error) {
      console.error(error);
    }
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
