import mongoose, { Schema, models } from 'mongoose'

export interface IContact {
  name: string
  email: string
  company?: string
  project?: string
  message: string
  submittedAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      trim: true,
    },
    project: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
ContactSchema.index({ submittedAt: -1 })
ContactSchema.index({ email: 1 })

const Contact = models.Contact || mongoose.model<IContact>('Contact', ContactSchema)

export default Contact
