import mongoose, { Model } from "mongoose";

export interface IQNA {
  studentPartnerId: mongoose.Types.ObjectId;
  sections: {
    sectionId: string;
    title: string;
    questions: {
      questionId: string;
      question: string;
      answer: string;
    }[];
  }[];
}

const QNASchema = new mongoose.Schema<IQNA>({
  studentPartnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentPartner",
    required: true,
  },
  sections: [
    {
      sectionId: String,
      title: String,
      questions: [
        {
          questionId: String,
          question: String,
          answer: String,
        },
      ],
    },
  ],
});

export const QNA: Model<IQNA> =
  mongoose.models.QNA || mongoose.model<IQNA>("QNA", QNASchema);
