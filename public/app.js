document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }

  if (event.target.dataset.type === 'edit') {
    const note = event.target.closest('li');
    const id = event.target.dataset.id;
    const title = note.childNodes[0].textContent.trim();
    const initialHtml = note.innerHTML;

    note.innerHTML = `
      <input type="text" value="${title}" name="title" required></input>
      <div>
        <button class="btn btn-success" data-type="save" data-id="<%= notes[i].id %>">Save</button>
        <button class="btn btn-danger" data-type="cancel" data-id="<%= notes[i].id %>">Cancel</button>
      </div>`;

    const noteHandle = (event) => {
      if (event.target.dataset.type === 'cancel') {
        note.innerHTML = initialHtml;
        note.removeEventListener('click', noteHandle);
      } else if (event.target.dataset.type === 'save') {
        const title = note.querySelector('input').value;

        edit(id, title).then(() => {
          note.innerHTML = initialHtml;
          note.removeEventListener('click', noteHandle);
          note.childNodes[0].textContent = title;
        });
      }
    };

    note.addEventListener('click', noteHandle);
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
