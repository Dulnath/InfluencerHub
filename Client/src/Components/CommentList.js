import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Image, } from 'react-bootstrap';
import Reply from './Reply';
import ReportDescription from './ReportDescription';
import EditComment from './EditComment';
import ReplyList from './ReplyList';

function CommentList() {
    const [commentList, setCommentList] = useState([]);
    const [openReplyWindow, setOpenReplyWindow] = useState(false);
    const [openReplies, setOpenReplies] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selected, setSelected] = useState();

    // const updateCommentList = () => {
    //     setCommentList(commentList.concat(newComment));
    // }

    const displayReplyWindow = (id) => {
        setSelected(id);
        setOpenReplyWindow(!openReplyWindow);
    }

    const reportWindow = (id) => {
        setSelected(id);
        setOpenReport(!openReport);
    }

    const editWindow = (id) => {
        setSelected(id);
        setOpenEdit(!openEdit);
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:5000/deleteComment/${id}`)
            .then((res) => {
                //console.log(res);
                console.log(res.data);
            })

        const newList = commentList.filter((comment) => comment._id !== id);
        setCommentList(newList);
    }

    const allReplies = (id) => {
        setSelected(id);
        setOpenReplies(!openReplies);
    }

    useEffect(() => {
        axios.get("http://localhost:5000/getComments").then((response) => {
            setCommentList(response.data);
            console.log(response.data);
        })
    }, [])

    //Test
    return (
        <div>
            <div className="commentList">
                {commentList.filter((comments) => comments.responseTo === null && comments.isVisible === true).map((comments, index) => {
                    return (
                        <div>
                            <Card className="comment">
                                <div>
                                    <div className="avatar">
                                        <Image src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" fluid="true" roundedCircle="true"></Image>
                                    </div>
                                    <p className="userName" style={{ fontWeight: "bold" }}>{comments._id}</p>
                                    <p id="dateTime">{comments.time}</p>
                                    {(comments.isEdited === true) ?
                                        <p id="edited">(Edited)</p> : null}

                                </div>
                                <p>{comments.comment}</p>
                                <div className="buttons">
                                    <Button className="button" variant="outline-secondary" size="sm" onClick={() => displayReplyWindow(comments._id)}>Reply</Button>

                                    {commentList.filter((reply) => reply.responseTo === comments._id && reply.isVisible === true).length === 0 ?
                                        <Button className="button" variant="outline-secondary" size="sm" onClick={() => deleteComment(comments._id)}>Delete</Button> : null}

                                    <Button className="button" variant="outline-secondary" size="sm" onClick={() => editWindow(comments._id)}>Edit</Button>
                                    <Button className="button" variant="outline-secondary" size="sm" onClick={() => reportWindow(comments._id)}>Report</Button>
                                </div>
                            </Card>

                            {commentList.filter((reply) => reply.responseTo === comments._id && reply.isVisible === true).length > 0 ?
                                <p style={{ fontWeight: "500", textDecorationLine: "underline" }}>
                                    <a onClick={() => allReplies(comments._id)}>View replies</a>
                                </p> : null
                            }

                            {(selected === comments._id) ?
                                openReplyWindow &&
                                < div >
                                    <Reply value={index} postID={comments._id} />
                                </div> : null
                            }

                            {(selected === comments._id) ?
                                openReport &&
                                <div>
                                    <ReportDescription commentID={comments._id} />
                                </div> : null
                            }

                            {(selected === comments._id) ?
                                openEdit &&
                                <div>
                                    <EditComment commentID={comments._id} />
                                </div> : null
                            }

                            {(selected === comments._id) ?
                                openReplies &&
                                <div>
                                    <ReplyList parentID={comments._id} />
                                </div> : null
                            }

                        </div>
                    );
                })}
            </div>
        </div >
    );
}

export default CommentList;

