jQuery(function($) {

  //
  // Model
  //

  // SampleModel
  function SampleModel() {
    this.status = "initializing"
  }
  SampleModel.prototype = {
    on: function(targetStatus, callback) {
      $(this).on(targetStatus, callback);
    },

    toStatus: function(newStatus) {
      this.status = newStatus;
      $(this).trigger(newStatus);
      console.log("Status to: " + newStatus); // DEBUG
    }
  }

  //
  // View Model
  //

  // MainFormViewModel
  function MainFormViewModel(sampleModel) {
    var self = this;

    this.sampleModel = sampleModel;

    // フォーム要素
    this.$textfield = $("#main-form__textfield");
    this.$buttonA = $("#main-form__buttonA");
    this.$buttonB = $("#main-form__buttonB");

    // SampleModelにイベントハンドラを登録する。
    sampleModel.on("initialized", function() {
      self.$textfield.val("初期化済み: " + sampleModel.status);
      console.log("画面の初期化が完了!!: " + sampleModel.status);
    });
    sampleModel.on("updated", function() {
      self.$textfield.val("更新済み: " + sampleModel.status);
      console.log("何かを更新しました!!: " + sampleModel.status);
    });
    sampleModel.on("stopped", function() {
      self.$textfield.val("停止済み: " + sampleModel.status);
      console.log("何かを停止しました!!: " + sampleModel.status);
    });

    // フォーム要素にイベントハンドラを登録する。
    this.$buttonA.on("click", this.update);
    this.$buttonB.on("click", this.stop);
  }
  MainFormViewModel.prototype = {
    update: function() {
      sampleModel.toStatus("updated");
    },

    stop: function() {
      sampleModel.toStatus("stopped");
    }
  }

  // SubFormViewModel
  // MainFormViewModelのことはまったく知る必要がない。
  function SubFormViewModel(sampleModel) {
    var self = this;

    this.sampleModel = sampleModel;

    // フォーム要素
    this.$currentStatus = $("#sub-form__current-status");
    this.$buttonA = $("#sub-form__buttonA");
    this.$buttonB = $("#sub-form__buttonB");

    // SampleModelにイベントハンドラを登録する。
    sampleModel.on("initialized", function() {
      self.$currentStatus.text("初期化済みですね: " + sampleModel.status);
    });
    sampleModel.on("updated", function() {
      self.$currentStatus.text("上のボタンで何かが更新されたっぽいですね: " + sampleModel.status);
    });
    sampleModel.on("stopped", function() {
      self.$currentStatus.text("上のボタンで何かが停止されたっぽいですね: " + sampleModel.status);
    });

    // フォーム要素にイベントハンドラを登録する。
    this.$buttonA.on("click", this.update);
    this.$buttonB.on("click", this.stop);
  }
  SubFormViewModel.prototype = {
    update: function() {
      sampleModel.toStatus("updated");
    },

    stop: function() {
      sampleModel.toStatus("stopped");
    }
  }

  // Initializing
  var sampleModel = new SampleModel();
  new MainFormViewModel(sampleModel);
  new SubFormViewModel(sampleModel);
  sampleModel.toStatus("initialized");

  console.log("Done.");
})
