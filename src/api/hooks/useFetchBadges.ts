import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { StatusCode } from "../client/IHttpClient";
import { Badge } from "../../types/userType";
import { filterBookStatus } from "../../utils/filters";

const useFetchBadges = () => {
    const [badges, setBadges] = useState<Badge>();
    const [ formattedBadges, setFormattedBadges ] = useState<Badge>({
        imageBookBadge: "",
        descriptionBookBadge: "",
        nameBookBadge: "",
        imagePaginometerBadge: "",
        descriptionPaginometerBadge: "",
        namePaginometerBadge: "",
        imageReviewBadge: "",
        descriptionReviewBadge: "",
        nameReviewBadge: "",
    });
    const service = new UserService();

    const fetchBadges = async () => {
        const response = await service.fetchMyBadges();
        if (response.statusCode === StatusCode.Ok) {
            setFormattedBadges({
                imageBookBadge: response.body.imageBookBadge,
                descriptionBookBadge: response.body.descriptionBookBadge,
                nameBookBadge: filterBookStatus(response.body.nameBookBadge),
                imagePaginometerBadge: response.body.imagePaginometerBadge,
                descriptionPaginometerBadge: response.body.descriptionPaginometerBadge,
                namePaginometerBadge: filterBookStatus(response.body.namePaginometerBadge),
                imageReviewBadge: response.body.imageReviewBadge,
                descriptionReviewBadge: response.body.descriptionReviewBadge,
                nameReviewBadge: filterBookStatus(response.body.nameReviewBadge),
            })
            setBadges(formattedBadges);
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