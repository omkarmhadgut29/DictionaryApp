export default function Render(path, element) {
  fetch(path)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      element.innerHTML = data;
    });
}
