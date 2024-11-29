"use client";

import { useState } from "react";

type Comment = {
  id: number;
  user: string;
  content: string;
  time: string;
};

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      user: "123",
      content: newComment,
      time: new Date().toISOString().split("T")[0],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-grow border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-yellow-200"
        />
        <button
          onClick={handleAddComment}
          className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg"
        >
          댓글 추가
        </button>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border rounded-lg bg-gray-50 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <h4 className="text-sm font-semibold">{comment.user}</h4>
                <p className="text-xs text-gray-500">{comment.time}</p>
                <p className="text-sm text-gray-700 mt-2">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
