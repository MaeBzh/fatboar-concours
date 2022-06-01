import {
  parse,
  isAfter,
  isValid,
  format as formatDate,
  isEqual,
} from "date-fns";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import {
  confirmed,
  digits,
  email,
  ext,
  image,
  max,
  regex,
  required,
} from "vee-validate/dist/rules";
import Vue from "vue";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

setInteractionMode("eager");

import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/fr.json";

Object.keys(rules).forEach((rule: string) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});
extend("required", {
  ...required,
  message: "Le champ {_field_} ne peut pas être vide.",
});

extend("max", {
  ...max,
  message: "Le champ {_field_} ne doit pas dépasser {length} caractères.",
});

extend("email", {
  ...email,
  message: "Veuillez entrer une adresse email valide.",
});

extend("digits", {
  ...digits,
  message: "Le champ {_field_} doit être composé de {length} chiffres.",
});

extend("regex", {
  ...regex,
  message:
    "Le champ {_field_} {_value_} contient des caratères non autorisés {regex}.",
});

extend("password", {
  ...regex,
  message: `Le mot de passe doit contenir au moins 8 caratères, dont au moins : un chiffre, une majuscule, une miniscule et un caratère spécial parmi !@#$%&? et pas d'espace.`,
});

extend("confirmed", {
  ...confirmed,
  message: "Les mots de passe en correspondent pas.",
});

extend("rgpd", {
  ...required,
  message:
    "Veuillez accepter notre politique de confidentialité des données afin de vous inscrire sur notre site.",
});

extend("image", {
  ...image,
  message: "Seules les images sont autorisées.",
});

extend("pdf", {
  validate: (files) => ext.validate(files, ["pdf"]),
  message: "Seuls les fichiers PDF sont autorisés.",
});

const parseDate = (date: string | Date, format: string): Date | null => {
  if (typeof date !== "string") {
    return isValid(date) ? date : null;
  }

  const parsed = parse(date, format, new Date());

  // if date is not valid or the formatted output after parsing does not match
  // the string value passed in (avoids overflows)
  if (!isValid(parsed) || formatDate(parsed, format) !== date) {
    return null;
  }

  return parsed;
};

extend("after", {
  validate: (value, params) => {
    const { targetValue, inclusion, format } = params as {
      targetValue: string | Date;
      inclusion: boolean;
      format: string;
    };

    value = parseDate(value, format);
    const target = parseDate(targetValue, format) as Date;

    // if either is not valid.
    if (!value || !target) {
      return false;
    }

    return isAfter(value, target) || (inclusion && isEqual(value, target));
  },
  message: "La date {_field_} doit être postérieur a {target}",
  params: [
    {
      name: "targetValue",
      isTarget: true,
    },
    {
      name: "inclusion",
      default: false,
      cast: (value) => !["false", false, 0, null, ""].includes(value),
    },
    {
      name: "format",
      default: "yyyy-mm-dd",
    },
  ],
});
