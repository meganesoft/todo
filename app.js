const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

(function(){
    // 初期化処理
    // ローカルストレージに格納されている値を取得し、リストを生成する
    for(var key in localStorage){
        var html = localStorage.getItem(key);
        if (html) {
            list.innerHTML += localStorage.getItem(key);
        }
    }
})();

const saveTaskToLocalStorage = (task,day_data, html) => {
    // null は、localStorage に保存しない
    if(html){
        // localStorage は、0 から始まる
        localStorage.setItem(task,day_data, html);
        return;
    }
    return;
}

const deleteTaskFromLocalStorage = (task,day_data) => {
    localStorage.removeItem(task,day_data);
    return;
}

const createTodoList = (task,day_data) => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <input type="date" class="date" value=${day_data}></input>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;

    saveTaskToLocalStorage(task, html); 
}

addTask.addEventListener('submit', e => {
    // デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    const task = addTask.add.value.trim();
    if(task.length) {
        // Todo List の HTML を作成
        createTodoList(task);
        // タスクに入力した文字をクリア
        addTask.reset();
    }
});

// 削除機能
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        if(!e.target.classList.contains('date')){
            e.target.parentElement.remove();
        }
    }
    const task = e.target.parentElement.textContent.trim()
    const day_data = e.target.parentElement.value()
    console.log(day_data)
    deleteTaskFromLocalStorage(task,day_data);
});

list.addEventListener('click', e => {
    const task = e.target.parentElement.textContent.trim()
    const day_data = e.target.parentElement.value()
    if (e.target.classList.contains('date')){
        saveTaskToLocalStorage(task, html); 
    }
    
});



const filterTasks = (term) => {

    Array.from(list.children)
        // フィルタ条件
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
    // 空白削除かつ、小文字に変換(大文字・小文字の区別をなくす)
    const term = search.value.trim().toLowerCase();
    filterTasks(term);
});