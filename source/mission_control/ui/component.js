
Template.component.chooseTemplate = function (name) {
  return Template[name];
};

Template.component.prepareData = function (data, context) {

  data.context = context;

  return data;

};

