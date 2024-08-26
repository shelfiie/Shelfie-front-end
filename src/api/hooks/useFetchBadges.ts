import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { StatusCode } from "../client/IHttpClient";
import { Badge } from "../../types/userType";

const useFetchBadges = () => {
    const [badges, setBadges] = useState<Badge>();
    const service = new UserService();
    const fetchBadges = async () => {
        const response = await service.fetchMyBadges();
        if (response.statusCode === StatusCode.Ok) {
            setBadges(response.body);
        } else {
            console.error(response.reject);
        }
    };
    
    useEffect(() => {
        fetchBadges();
    }, []);

    return { badges, refetchBadges: fetchBadges }; 
};
export { useFetchBadges };