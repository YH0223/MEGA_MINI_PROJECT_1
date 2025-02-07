import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App"; // ✅ AuthContext 가져오기
import "./NoticeDetail.css";

interface Notice {
    noticeId: number;
    noticeTitle: string;
    noticeContext: string;
    noticeCreatedAt: string;
}

// ✅ Axios 기본 설정: 세션 유지
axios.defaults.withCredentials = true;

const NoticeDetail = () => {
    const { noticeId } = useParams<{ noticeId: string }>();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <p>AuthContext를 찾을 수 없습니다.</p>;
    }

    const { isAuthenticated, setIsAuthenticated } = authContext;
    const [notice, setNotice] = useState<Notice | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContext, setEditContext] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    /** ✅ 세션 유지 확인 */
    useEffect(() => {
        axios.get("http://localhost:8080/api/session")
            .then(response => {
                console.log("✅ 로그인 유지됨. 사용자:", response.data);
                setIsAuthenticated(true);
            })
            .catch(() => {
                console.log("❌ 로그인 세션 없음");
                setIsAuthenticated(false);
                navigate("/"); // 미로그인 시 로그인 페이지로 이동
            });
    }, [setIsAuthenticated, navigate]);

    /** ✅ 공지사항 불러오기 */
    useEffect(() => {
        if (isAuthenticated) {
            fetchNotice();
        }
    }, [noticeId, isAuthenticated]);

    const fetchNotice = async () => {
        try {
            console.log(`🔍 요청할 공지사항 ID: ${noticeId}`);
            const response = await axios.get(`http://localhost:8080/notice/detail/${noticeId}`, {
                withCredentials: true
            });

            console.log("✅ 공지사항 불러오기 성공:", response.data);
            setNotice(response.data);
            setEditTitle(response.data.noticeTitle);
            setEditContext(response.data.noticeContext);
        } catch (error) {
            console.error("❌ 공지사항 불러오기 오류:", error);
        } finally {
            setLoading(false);
        }
    };

    const goToList = () => {
        navigate(-1); // 🔥 이전 페이지로 이동
    };

    /** ✅ 공지 수정 */
    const updateNotice = async () => {
        try {
            await axios.put(`http://localhost:8080/notice/update/${noticeId}`, {
                noticeTitle: editTitle,
                noticeContext: editContext
            }, { withCredentials: true });

            alert("공지사항이 수정되었습니다.");
            setNotice({ ...notice!, noticeTitle: editTitle, noticeContext: editContext });
            setIsEditing(false);
        } catch (error) {
            console.error("공지 수정 오류:", error);
        }
    };

    /** ✅ 공지 삭제 */
    const deleteNotice = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`http://localhost:8080/notice/delete/${noticeId}`, { withCredentials: true });
            alert("공지사항이 삭제되었습니다.");
            navigate(-1);
        } catch (error) {
            console.error("공지 삭제 오류:", error);
        }
    };

    if (!isAuthenticated) return <p className="loading-text">세션 확인 중...</p>;
    if (loading) return <p className="loading-text">공지사항을 불러오는 중...</p>;
    if (!notice) return <p className="error-text">공지사항을 찾을 수 없습니다.</p>;

    return (
        <div className="notice-detail-container">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="notice-edit-input"
                    />
                    <textarea
                        value={editContext}
                        onChange={(e) => setEditContext(e.target.value)}
                        className="notice-edit-textarea"
                    />
                    <div className="notice-actions">
                        <button className="save-button" onClick={updateNotice}>저장</button>
                        <button className="cancel-button" onClick={() => setIsEditing(false)}>취소</button>
                    </div>
                </>
            ) : (
                <>
                    <h3>{notice.noticeTitle}</h3>
                    <p>{notice.noticeContext}</p>
                    <div className="notice-actions">
                        <button className="list-button" onClick={goToList}>목록</button>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>수정</button>
                        <button className="delete-button" onClick={deleteNotice}>삭제</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default NoticeDetail;
