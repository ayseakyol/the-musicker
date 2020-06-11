fetch("/api/albums")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let newTable = document.getElementById("tbl");
    for (let i = 0; i < data.length; i++) {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `
     <tr>
      <td >${JSON.stringify(data[i].AlbumId)}</td>
      <td>${JSON.stringify(data[i].Title)}</td>
      <td>${JSON.stringify(data[i].ArtistId)}</td>
     </tr>
     `;
      newTable.appendChild(newRow);
    }
  })
  .catch((err) => console.error(err));
