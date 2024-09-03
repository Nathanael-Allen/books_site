import { searchDB } from "../database/database.cjs";
import { bookReview } from "./bookReview.js";
import { reviewHeader } from "./reviewHeader.js";

async function searchReviews(search){
    return /*html*/`
        <div class="flex flex-col justify-center items-center md:w-2/4 md:m-auto">
            ${reviewHeader()}
            ${await bookReview(searchDB(search))}
        </div>
    `;
};

export { searchReviews };