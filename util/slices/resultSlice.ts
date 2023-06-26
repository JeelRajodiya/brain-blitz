import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AnswerSheet, QuizResult } from "../types";

interface QuizResultState {
  value: QuizResult;
}
const initialState: QuizResultState = {
  value: {
    quizId: "",
    correctQuestions: 0,
    createdAt: new Date(),
    incorrectQuestions: 0,
    negativeMarks: 0,
    positiveMarks: 0,
    quizTitle: "",
    creatorName: "",
    skippedQuestions: 0,
    totalMarks: 0,
    hasDifficultyTags: false,
    maxMarks: 0,
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateResult: (state, action: PayloadAction<QuizResult>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateResult } = counterSlice.actions;

export default counterSlice.reducer;
