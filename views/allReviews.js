import { getAllReviews } from "../database/database.cjs";
import { bookReview } from "./bookReview.js";
import { reviewHeader } from "./reviewHeader.js";

async function allReviews(){
    return /*html*/`
        <div class="flex flex-col md:w-2/4 justify-center items-center md:m-auto">
            ${reviewHeader()}
            ${await bookReview(getAllReviews())}
        </div>
    `;
};

export { allReviews };