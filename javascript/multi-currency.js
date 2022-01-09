class multiCurrency {
    constructor() {
      this.changeEvent();
    }
    changeEvent = () => {
      $(document).on("change", ".multi-currency select", function () {
        $(this).closest("form").submit();
      })
    }
  }
  if ($(".multi-currency").length > 0) {
    new multiCurrency();
  }