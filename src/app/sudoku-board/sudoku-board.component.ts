import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuService } from '../sudoku.service';

@Component({
  selector: 'app-sudoku-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent implements OnInit {
  board: number[][] = [];
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedNumber: number | null = null;
  selectedCell: { row: number; col: number } | null = null;
  noteCounts = new Map<number, number>(); // Mock note counts

  constructor(private sudokuService: SudokuService) { }

  ngOnInit() {
    this.board = this.sudokuService.generatePuzzle();
    this.initNotes();
  }

  selectNumber(num: number) {
    this.selectedNumber = num;
  }

  selectCell(row: number, col: number) {
    this.selectedCell = { row, col };
  }

  isCellSelected(row: number, col: number): boolean {
    return this.selectedCell?.row === row && this.selectedCell?.col === col;
  }

  onInputChange(event: any, row: number, col: number) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.replace(/^0+/, ''); // Remove leading zeros

    if (value.length > 1) {
      value = value.charAt(0); // Only keep the first digit
    }

    const num = parseInt(value, 10);
    if (num >= 1 && num <= 9) {
      this.board[row][col] = num;
    } else {
      this.board[row][col] = 0; // Reset if invalid
    }

    event.target.value = this.board[row][col] ? String(this.board[row][col]) : ''; // Ensure correct display
  }


  undo() {
    console.log('Undo action');
  }

  erase() {
    if (this.selectedCell) {
      this.board[this.selectedCell.row][this.selectedCell.col] = 0;
    }
  }

  initNotes() {
    this.numbers.forEach(num => {
      this.noteCounts.set(num, Math.floor(Math.random() * 6)); // Random note counts
    });
  }

  getNoteCount(num: number): number {
    return this.noteCounts.get(num) || 0;
  }


}
