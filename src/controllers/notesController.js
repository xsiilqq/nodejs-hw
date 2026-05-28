import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page, perPage, tag, search } = req.query;
  const { _id: userId } = req.user;
  const skip = (page - 1) * perPage;
  const query = Note.find({ userId });

  if (tag) {
    query.where('tag').equals(tag);
  }

  if (typeof search === 'string') {
    query.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const totalNotes = await Note.countDocuments(query.getFilter());
  const notes = await query.skip(skip).limit(perPage);
  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;
  const note = await Note.findOne({
    _id: noteId,
    userId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const { _id: userId } = req.user;
  const note = await Note.create({
    ...req.body,
    userId,
  });

  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;
  const updatedNote = await Note.findOneAndUpdate({
    _id: noteId,
    userId,
  }, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updatedNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;
  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    userId,
  });

  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(deletedNote);
};
