
package com.devops.expense.service;

import com.devops.expense.model.Expense;
import com.devops.expense.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Get expense by ID
    public Expense getExpenseById(Integer id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with ID: " + id));
    }

    // Create expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Update expense
    public Expense updateExpense(Integer id, Expense updatedExpense) {

        Expense existingExpense = getExpenseById(id);

        existingExpense.setTitle(updatedExpense.getTitle());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setExpenseDate(updatedExpense.getExpenseDate());

        return expenseRepository.save(existingExpense);
    }

    // Delete expense
    public void deleteExpense(Integer id) {
        Expense expense = getExpenseById(id);
        expenseRepository.delete(expense);
    }
}

