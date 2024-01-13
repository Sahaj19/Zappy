const listingDeletionButtons = document.querySelectorAll(
  ".deleteListingButton"
);
const reviewDeletionButtons = document.querySelectorAll(".deleteReviewButton");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
listingDeletionButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const confirmation = confirm(
      "Are you sure you want to delete this toy's info?"
    );
    if (confirmation) {
      btn.closest("form").submit();
    }
  });
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
reviewDeletionButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const confirmation = confirm(
      "Are you sure you want to delete your special moment?"
    );
    if (confirmation) {
      btn.closest("form").submit();
    }
  });
});
