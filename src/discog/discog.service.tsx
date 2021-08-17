export class DiscogService {
  getProducts() {
    return fetch("data/discog-data.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
