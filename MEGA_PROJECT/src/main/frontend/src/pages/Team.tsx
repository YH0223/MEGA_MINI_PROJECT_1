import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import "./team.css";

const API_BASE_URL = "http://localhost:8080/api";

const TeamManagement = ({ projectId }: { projectId: number }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)!;
    const [teamMembers, setTeamMembers] = useState<string[]>([]); // ✅ ID만 저장
    const [searchId, setSearchId] = useState(""); // ✅ 검색할 userId
    const [searchResults, setSearchResults] = useState<string[]>([]); // ✅ 검색 결과 저장
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false); // ✅ 검색창 표시 여부 상태 추가
    const searchRef = useRef<HTMLDivElement>(null); // ✅ 검색창 감지용 ref 추가


    /** ✅ 세션 유지 확인 및 팀원 목록 불러오기 */
    useEffect(() => {
        axios.get(`${API_BASE_URL}/session`, { withCredentials: true })
            .then(response => {
                console.log("✅ 로그인 유지됨. 사용자:", response.data);
                setIsAuthenticated(true);
                fetchTeamMembers();
            })
            .catch(() => {
                console.log("❌ 로그인 세션 없음");
                setIsAuthenticated(false);
            });
    }, [setIsAuthenticated]);

    /** ✅ 팀원 목록 불러오기 */
    const fetchTeamMembers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/team/${projectId}`, { withCredentials: true });
            setTeamMembers(response.data.map((member: { userId: string }) => member.userId)); // ✅ userId만 저장
        } catch (error) {
            console.error("❌ 팀원 목록 불러오기 오류:", error);
        }
    };

    const addTeamMember = async () => {
        if (!searchId.trim()) {
            alert("추가할 팀원의 ID를 입력해주세요.");
            return;
        }

        if (teamMembers.includes(searchId)) {
            alert("🚨 이미 추가된 팀원입니다!");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/addteammate`,
                { userId: searchId, projectId },
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert("✅ 팀원이 추가되었습니다.");
                setSearchId("");
                fetchTeamMembers();
            }
        } catch (error: any) {
            if (error.response?.status === 404) {
                alert("🚨 존재하지 않는 유저입니다!");
            } else {
                alert("❌ 팀원 추가 중 오류가 발생했습니다.");
            }
            console.error("❌ 팀원 추가 오류:", error);
        }
    };


    const removeTeamMember = async (userId: string) => {
        if (!window.confirm("이 팀원을 삭제하시겠습니까?")) return;

        try {
            const response = await axios.delete(`${API_BASE_URL}/deleteteammate`, {
                params: { userId, projectId },  // ✅ `params`에 userId와 projectId 전달
                withCredentials: true
            });

            if (response.status === 200) {
                alert("✅ 팀원이 삭제되었습니다.");
                fetchTeamMembers();
            }
        } catch (error) {
            console.error("❌ 팀원 삭제 오류:", error);
            alert("팀원 삭제 중 오류가 발생했습니다.");
        }
    };


    useEffect(() => {
        if (!searchId.trim()) {
            setSearchResults([]);
            setShowResults(false); // ✅ 입력값이 없으면 검색창 닫기
            return;
        }

        setLoading(true);
        setShowResults(true); // ✅ 검색창 활성화

        const delayDebounceFn = setTimeout(() => {
            axios.get(`${API_BASE_URL}/searchUsers?query=${searchId}`, { withCredentials: true })
                .then(response => {
                    setSearchResults(response.data.map((user: { userId: string }) => user.userId)); // ✅ userId만 저장
                })
                .catch(error => console.error("❌ 사용자 검색 오류:", error))
                .finally(() => setLoading(false));
        }, 300); // 0.3초 딜레이

        return () => clearTimeout(delayDebounceFn);
    }, [searchId]);


    /** ✅ 바깥 클릭 시 검색 결과 창 닫기 */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false); // ✅ 검색 결과 숨기기
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    if (!isAuthenticated) return <p>세션 확인 중...</p>;

    return (
        <div className="team-container">
            <h3 className="team-title">팀원 추가</h3>

            {/* ✅ 팀원 추가 - ID 입력 */}
            <div className="add-member">
                <input
                    type="text"
                    className="p-2 border rounded w-full"
                    placeholder="추가할 팀원 ID 입력..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onFocus={() => setShowResults(true)} // ✅ 검색창 클릭 시 결과 보이게 설정
                />
                <button className="add-button" onClick={addTeamMember}>추가</button>
            </div>

            {/* ✅ 실시간 검색 결과 */}
            {searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults.map((id) => (
                        <li key={id} onClick={() => setSearchId(id)}>
                            {id}
                        </li>
                    ))}
                </ul>
            )}


            {/* ✅ 팀원 목록 - ID만 출력 */}
            <div className="team-list">
                <h2>등록된 팀원</h2>
                {teamMembers.map((userId) => (
                    <div key={userId} className="team-member">
                        <span>{userId}</span>
                        <button className="remove-button" onClick={() => removeTeamMember(userId)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamManagement;
