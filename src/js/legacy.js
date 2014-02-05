jQuery(function($) {

  //
  // Model
  //

  // SampleModel
  function SampleModel() {
    this.status = "initializing"
  }
  SampleModel.prototype = {
    toStatus: function(newStatus) {
      this.status = newStatus;
    }
  }

  //
  // View Model
  //

  // MainFormViewModel
  function MainFormViewModel(sampleModel, subFormViewModel) {
    var self = this;

    this.sampleModel = sampleModel;
    this.subFormViewModel = subFormViewModel;

    // フォーム要素
    this.$textfield = $("#main-form__textfield");
    this.$buttonA = $("#main-form__buttonA");
    this.$buttonB = $("#main-form__buttonB");

    // フォーム要素にイベントハンドラを登録する。
    this.$buttonA.on("click", function() {
      self.update();
    });
    this.$buttonB.on("click", function() {
      self.stop();
    });
  }
  MainFormViewModel.prototype = {
    initialized: function() {
      sampleModel.toStatus("initialized");
      this.$textfield.val("初期化済み: " + sampleModel.status);
      subFormViewModel.$currentStatus.text("初期化済みですね: " + sampleModel.status); // SubFormViewModelの操作をMain側でやらないといけないのはスパゲティ化の始まり
      console.log("画面の初期化が完了!!");
    },
    update: function() {
      sampleModel.toStatus("updated");
      this.$textfield.val("更新済み: " + sampleModel.status);
      subFormViewModel.$currentStatus.text("上のボタンで何かが更新されたっぽいですね: " + sampleModel.status);;
      console.log("何かを更新しました!!");
    },

    stop: function() {
      sampleModel.toStatus("stopped");
      this.$textfield.val("停止済み: " + sampleModel.status);
      subFormViewModel.$currentStatus.text("上のボタンで何かが停止されたっぽいですね: " + sampleModel.status);
      console.log("何かを停止しました!!");
    }
  }

  // SubFormViewModel
  function SubFormViewModel(sampleModel) {
    var self = this;

    this.sampleModel = sampleModel;

    // フォーム要素
    this.$currentStatus = $("#sub-form__current-status");
    this.$buttonA = $("#sub-form__buttonA");
    this.$buttonB = $("#sub-form__buttonB");

    // フォーム要素にイベントハンドラを登録する。
    this.$buttonA.on("click", function() {
      self.update();
    });
    this.$buttonB.on("click", function() {
      self.stop();
    });
  }
  SubFormViewModel.prototype = {
    update: function() {
      // Main側と共通の処理を発動させるために、強い依存関係が必要になってしまう。結局、双方向依存になってしまう...
      mainFormViewModel.update();
      this.$currentStatus.text("上のボタンで何かが更新されたっぽいですね: " + sampleModel.status);;
    },

    stop: function() {
      mainFormViewModel.stop();
      this.$currentStatus.text("上のボタンで何かが停止されたっぽいですね: " + sampleModel.status);
    }
  }

  // Initializing
  var sampleModel = new SampleModel();
  var subFormViewModel = new SubFormViewModel(sampleModel);
  var mainFormViewModel = new MainFormViewModel(sampleModel, subFormViewModel);
  subFormViewModel.mainFormViewModel = mainFormViewModel;
  mainFormViewModel.initialized();

  console.log("Done.");
})
