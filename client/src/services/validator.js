import {Validator} from 'vee-validate';
import AuthAPI from '#/Auth';
import PublicationsAPI from '#/Publications';


function createValidator (model,name) {
  for (var path in model.fields) {
    model.fields[path].forEach((field) => {
      const rule = path;
      Validator.extend(`${name}.${rule}.${field}`, {
        getMessage: function (field, params, data) {
          return (data && data.message) ? data.message : 'Invalid';
        },
        validate: (value) => {
          return new Promise(resolve => {
            model.sender.check(rule,field, value).then((response) => {
              return response.data;
            }).then(data => {
              if (!data.success) throw data;
              resolve(
                {
                  valid: data.result,
                  data: data.result ? undefined : {
                    message: (data.message) ? data.message : "Server say no"
                  }
                });
            }).catch(e => {
              resolve(
                {
                  valid: false,
                  data: {
                    message: (e.message) ? e.message : "Server say no"
                  }
                });
            });
          });
        }
      });
    })
  }
}

export default () => {
  const models = {
    auth: {
      sender: AuthAPI,
      fields: {
        login: ['email', 'password'],
        register: ['password', 'email', 'name'],
      }
    },
    publication: {
      sender: PublicationsAPI,
      fields: {
        create: ['title', 'difficult', 'tag'],
      }
    }
  }
  for (var model in models) {
    createValidator(models[model],model);
  }
}


