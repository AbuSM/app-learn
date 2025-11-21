import getDOMElement from "../../api/getDOMElement";
import { pushToServer } from "./pushServer";
import { tasks } from "./script";
import { toggleRedBorder } from "./toggleRedBorder";

export default function changeModal(task, listIndex, taskIndex) {
  return new Promise((resolve) => {
    let members = task.members || [];
    let comments = task.comments || [];

    // members:

    const getMembersHTML = () => {
      let ans = "";
      for (let index in members) {
        const element = members[index];
        ans += /*html*/ `<li data-index="${index}" onclick="window.onMemberClick(event)" class="px-2 py-1.5 rounded [user-select:none] hover:bg-black/10 hover:cursor-pointer active:bg-black/15 transition">
                    ${element.username}
                </li>`;
      }
      if (members.length == 0) {
        ans += /*html*/ `
                    <li class="text-sm px-2 py-1.5">Нет добавленных участников</li>
                `;
      }
      return ans;
    };

    const removeMemberMenu = () => {
      const inputs = document.querySelectorAll(".membersMenu");
      inputs.forEach((element) => {
        element.remove();
      });
    };
    window.removeMemberMenu = removeMemberMenu;

    const addMember = (user) => {
      setTimeout(() => {
        members.push(user);
        document.querySelector(".membersList").innerHTML = getMembersHTML();
      }, 0);
    };
    const removeMember = (index) => {
      setTimeout(() => {
        members.splice(index, 1);
        document.querySelector(".membersList").innerHTML = getMembersHTML();
      }, 0);
    };

    const onMemberClick = (event) => {
      const index = +event.target.dataset.index;
      removeMember(index);
    };
    window.onMemberClick = onMemberClick;

    const onAddMembersClick = (event) => {
      const membersContainer = modalElement.querySelector(
        ".addMembersContainer",
      );

      if (membersContainer.children.length < 2) {
        membersContainer.innerHTML += /*html*/ `
                    <div class="membersMenu z-100 w-[250px] absolute top-[110%] p-3 left-0 bg-white rounded border-gray">
                        <h3 class="flex flex-col items-center">Участники</h3>
                        <input oninput="window.onElementInput(event)" onkeydown="window.onMemberInputKeyDown(event)" class="name-search text-sm mt-3" type="text" placeholder="Искать участников">
                        <ul class="membersList flex flex-col mt-2 gap-1">
                            ${getMembersHTML()}
                        </ul>
                    </div>
                `;
        const searchInput = membersContainer.querySelector(".name-search");
        searchInput.focus();
      }
    };
    window.onAddMembersClick = onAddMembersClick;

    const onMemberInputKeyDown = (event) => {
      if (event.key == "Enter") {
        if (!event.target.value) {
          toggleRedBorder(event.target, true);
        } else {
          addMember({ username: event.target.value });
          event.target.value = "";
        }
      }
    };
    window.onMemberInputKeyDown = onMemberInputKeyDown;

    const onElementInput = (event) => {
      toggleRedBorder(event.target, !event.target.value);
    };
    window.onElementInput = onElementInput;

    // comment:

    const renderComments = () => {
      let commentsHTML = "";

      for (let comment of comments) {
        commentsHTML += /*html*/ `
                    <li>
                        <ui-comment username="${comment.username}" message="${comment.message}"></ui-comment>
                    </li>
                `;
      }

      const commentsListElement = document.querySelector(".comments");
      commentsListElement.innerHTML = commentsHTML;
    };

    const onPublishComment = (event) => {
      const inputElement = document.querySelector(".comment-input");
      const message = inputElement.value;
      const username = "Kayumov Muhammad";
      if (!message) {
        toggleRedBorder(inputElement, true);
      } else {
        comments = [
          {
            message,
            username,
          },
          ...comments,
        ];
        tasks[listIndex].tasks[taskIndex].comments = comments;
        pushToServer(tasks);
        inputElement.value = "";
        renderComments();
      }
    };
    window.onPublishComment = onPublishComment;

    // modal:

    const modalElement = getDOMElement(/*html*/ `
                     <div class="loader_backdrop">
                        <div class="stop_propagation lg:w-[800px] md:w-[600px] sm:w-[400px] w-[250px] ">
                            <div class="flex items-center justify-center overflow-y-auto overflow-x-hidden z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div class="relative p-4 w-full max-h-full">
                                    <div class="relative bg-white rounded-lg shadow-sm">
                                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                            <h3 class="text-xl font-semibold text-gray-900">
                                                Изменить задачу
                                            </h3>
                                            <button type="button" class="cancelBtn hover:cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div class="flex">
                                            <div class="change-form p-4 md:p-5 space-y-4 flex-4">
                                                <div class="flex w-full gap-2 flex-wrap">
                                                    <input placeholder="Заголовок" class="title flex-3" type="text" value="${task.title}">
                                                </div>
                                                <div class="flex gap-2 flex-wrap">
                                                    <input type="date" class="date flex-1 min-w-[200px]" value="${task.date}">
                                                    <div class="addMembersContainer relative">
                                                        <button onclick="window.onAddMembersClick(event)" class="addMembersBtn input_style flex-1 flex items-center gap-1 active:brightness-70 hover:brightness-80 hover:cursor-pointer w-full transition-all">
                                                            <user-plus-icon class="inline-block"></user-plus-icon>Участники
                                                        </button>
                                                    </div>
                                                </div>
                                                <textarea rows="8" placeholder="Описание" class="description min-w-0 w-full">${task.description}</textarea>
                                            </div>
                                            <div class="p-4 !pl-0 md:p-5 flex flex-col gap-2 flex-3">
                                                <h4>Коментарии и активности</h4>
                                                <div class="relative">
                                                    <textarea oninput="window.onElementInput(event)" placeholder="Написать коментарий" class="w-full comment-input"></textarea>
                                                    <button onclick="window.onPublishComment(event)" class="bg-[var(--primary)] px-3 py-1.5 text-white rounded text-sm hover:cursor-pointer mt-1.5 hover:brightness-90 active:brightness-80 transition">Отправить</button>
                                                </div>
                                                <ul class="comments flex-[1_1_0] overflow-auto flex flex-col gap-2">
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                            <button data-modal-hide="default-modal" type="button" class="saveBtn hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Сохранить</button>
                                            <button data-modal-hide="default-modal" type="button" class="deleteBtn text-white bg-[#c70036] rounded-lg ml-3 hover:cursor-pointer box-border border border-transparent hover:bg-[#a50036] focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Удалить</button>
                                            <button data-modal-hide="default-modal" type="button" class="cancelBtn hover:cursor-pointer py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Отмена</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `);

    document.body.appendChild(modalElement);

    const titleInput = modalElement.querySelector(".title");
    const descriptionInput = modalElement.querySelector(".description");
    const dateInput = modalElement.querySelector(".date");

    renderComments();

    titleInput.focus();
    titleInput.setSelectionRange(
      titleInput.value.length,
      titleInput.value.length,
    );
    titleInput.addEventListener("input", (event) => {
      toggleRedBorder(event.target, !event.target.value.length);
    });

    const cancelBtn = modalElement.querySelectorAll(".cancelBtn");
    const saveBtn = modalElement.querySelector(".saveBtn");
    const deleteBtn = modalElement.querySelector(".deleteBtn");

    const onCancel = () => {
      resolve(task);
      modalElement.remove();
      window.onCancel = undefined;
    };
    window.onCancel = onCancel;
    const onSave = () => {
      if (!!titleInput.value.length) {
        resolve({
          ...task,
          title: titleInput.value,
          description: descriptionInput.value,
          date: dateInput.value,
          members,
          comments,
        });
        modalElement.remove();
      } else {
        toggleRedBorder(titleInput, true);
      }
    };
    const onDelete = () => {
      resolve({
        isDelete: true,
      });
      modalElement.remove();
    };

    deleteBtn.addEventListener("click", () => {
      onDelete();
    });

    cancelBtn.forEach((element) => {
      element.addEventListener("click", () => {
        onCancel();
      });
    });
    saveBtn.addEventListener("click", () => {
      onSave();
    });

    const inputElements = modalElement.querySelectorAll(
      ".change-form input,.change-form textarea",
    );
    inputElements.forEach((element) => {
      element.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
          onSave();
        }
      });
    });

    modalElement.addEventListener("click", () => {
      onCancel();
    });
    document
      .querySelector(".stop_propagation")
      .addEventListener("click", (event) => {
        if (!event.target.closest(".addMembersContainer,.addMembersBtn")) {
          removeMemberMenu();
        }

        event.stopPropagation();
      });
  });
}
