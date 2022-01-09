class multiLanguage {
    constructor() {
      this.changeEvent();
    }
    changeEvent = () => {
      $(document).on("change", ".launguage-selector select", function () {
        $(this).closest("form").submit();
      })
    }
  }
  if ($(".launguage-selector").length > 0) {
    new multiLanguage();
  }