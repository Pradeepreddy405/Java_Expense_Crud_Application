
const API_URL = "/api/expenses";

const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable");
const totalAmount = document.getElementById("totalAmount");
const message = document.getElementById("message");

const expenseId = document.getElementById("expenseId");
const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const expenseDate = document.getElementById("expenseDate");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");

let expenses = [];

// GET: Fetch all expenses
async function loadExpenses() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch expenses");
        }

        expenses = await response.json();

        displayExpenses();
        calculateTotal();

    } catch (error) {
        expenseTable.innerHTML =
            '<tr><td colspan="7">Failed to load expenses. Check the backend connection.</td></tr>';

        showMessage(error.message, true);
    }
}

// Display expenses in the HTML table
function displayExpenses() {
    expenseTable.innerHTML = "";

    if (expenses.length === 0) {
        expenseTable.innerHTML =
            '<tr><td colspan="7">No expenses found</td></tr>';
        return;
    }

    expenses.forEach(expense => {
        const row = document.createElement("tr");

        const values = [
            expense.id,
            expense.title,
            expense.category,
            "₹" + Number(expense.amount).toFixed(2),
            expense.description || "-",
            expense.expenseDate || "-"
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.addEventListener("click", () => editExpense(expense.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", () => deleteExpense(expense.id));

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        row.appendChild(actions);

        expenseTable.appendChild(row);
    });
}

// Calculate total expenses
function calculateTotal() {
    const total = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    totalAmount.textContent = "₹" + total.toFixed(2);
}

// POST and PUT: Add or update an expense
expenseForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = expenseId.value;

    const expense = {
        title: title.value.trim(),
        category: category.value.trim(),
        amount: Number(amount.value),
        description: description.value.trim(),
        expenseDate: expenseDate.value
    };

    if (!expense.title || !expense.category ||
        !Number.isFinite(expense.amount) || expense.amount <= 0 ||
        !expense.expenseDate) {
        showMessage("Please enter valid expense details.", true);
        return;
    }

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            throw new Error("Unable to save expense");
        }

        showMessage(id ? "Expense updated successfully!" :
            "Expense added successfully!");

        resetForm();
        await loadExpenses();

    } catch (error) {
        showMessage(error.message, true);
    }
});

// Edit expense
function editExpense(id) {
    const expense = expenses.find(item => item.id === id);

    if (!expense) return;

    expenseId.value = expense.id;
    title.value = expense.title;
    category.value = expense.category;
    amount.value = expense.amount;
    description.value = expense.description || "";
    expenseDate.value = expense.expenseDate || "";

    document.getElementById("formTitle").textContent = "Update Expense";
    submitButton.textContent = "Update Expense";
    cancelButton.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// DELETE: Remove expense
async function deleteExpense(id) {
    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete expense");
        }

        showMessage("Expense deleted successfully!");
        await loadExpenses();

    } catch (error) {
        showMessage(error.message, true);
    }
}

// Reset form
function resetForm() {
    expenseForm.reset();
    expenseId.value = "";

    document.getElementById("formTitle").textContent = "Add New Expense";
    submitButton.textContent = "Add Expense";
    cancelButton.hidden = true;
}

cancelButton.addEventListener("click", resetForm);

// Display messages
function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "red" : "green";
}

// Load data when webpage opens
loadExpenses();

