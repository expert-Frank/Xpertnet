/*!
 *  Lang.js for Laravel localization in JavaScript.
 *
 *  @version 1.1.10
 *  @license MIT https://github.com/rmariuzzo/Lang.js/blob/master/LICENSE
 *  @site    https://github.com/rmariuzzo/Lang.js
 *  @author  Rubens Mariuzzo <rubens@mariuzzo.com>
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.Lang = factory();
  }
})(this, function () {
  "use strict";
  function inferLocale() {
    if (typeof document !== "undefined" && document.documentElement) {
      return document.documentElement.lang;
    }
  }
  function convertNumber(str) {
    if (str === "-Inf") {
      return -Infinity;
    } else if (str === "+Inf" || str === "Inf" || str === "*") {
      return Infinity;
    }
    return parseInt(str, 10);
  }
  var intervalRegexp =
    /^({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])$/;
  var anyIntervalRegexp =
    /({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])/;
  var defaults = { locale: "en" };
  var Lang = function (options) {
    options = options || {};
    this.locale = options.locale || inferLocale() || defaults.locale;
    this.fallback = options.fallback;
    this.messages = options.messages;
  };
  Lang.prototype.setMessages = function (messages) {
    this.messages = messages;
  };
  Lang.prototype.getLocale = function () {
    return this.locale || this.fallback;
  };
  Lang.prototype.setLocale = function (locale) {
    this.locale = locale;
  };
  Lang.prototype.getFallback = function () {
    return this.fallback;
  };
  Lang.prototype.setFallback = function (fallback) {
    this.fallback = fallback;
  };
  Lang.prototype.has = function (key, locale) {
    if (typeof key !== "string" || !this.messages) {
      return false;
    }
    return this._getMessage(key, locale) !== null;
  };
  Lang.prototype.get = function (key, replacements, locale) {
    if (!this.has(key, locale)) {
      return key;
    }
    var message = this._getMessage(key, locale);
    if (message === null) {
      return key;
    }
    if (replacements) {
      message = this._applyReplacements(message, replacements);
    }
    return message;
  };
  Lang.prototype.trans = function (key, replacements) {
    return this.get(key, replacements);
  };
  Lang.prototype.choice = function (key, number, replacements, locale) {
    replacements = typeof replacements !== "undefined" ? replacements : {};
    replacements.count = number;
    var message = this.get(key, replacements, locale);
    if (message === null || message === undefined) {
      return message;
    }
    var messageParts = message.split("|");
    var explicitRules = [];
    for (var i = 0; i < messageParts.length; i++) {
      messageParts[i] = messageParts[i].trim();
      if (anyIntervalRegexp.test(messageParts[i])) {
        var messageSpaceSplit = messageParts[i].split(/\s/);
        explicitRules.push(messageSpaceSplit.shift());
        messageParts[i] = messageSpaceSplit.join(" ");
      }
    }
    if (messageParts.length === 1) {
      return message;
    }
    for (var j = 0; j < explicitRules.length; j++) {
      if (this._testInterval(number, explicitRules[j])) {
        return messageParts[j];
      }
    }
    var pluralForm = this._getPluralForm(number);
    return messageParts[pluralForm];
  };
  Lang.prototype.transChoice = function (key, count, replacements) {
    return this.choice(key, count, replacements);
  };
  Lang.prototype._parseKey = function (key, locale) {
    if (typeof key !== "string" || typeof locale !== "string") {
      return null;
    }
    var segments = key.split(".");
    var source = segments[0].replace(/\//g, ".");
    return {
      source: locale + "." + source,
      sourceFallback: this.getFallback() + "." + source,
      entries: segments.slice(1),
    };
  };
  Lang.prototype._getMessage = function (key, locale) {
    locale = locale || this.getLocale();
    key = this._parseKey(key, locale);
    if (
      this.messages[key.source] === undefined &&
      this.messages[key.sourceFallback] === undefined
    ) {
      return null;
    }
    var message = this.messages[key.source];
    var entries = key.entries.slice();
    var subKey = "";
    while (entries.length && message !== undefined) {
      var subKey = !subKey
        ? entries.shift()
        : subKey.concat(".", entries.shift());
      if (message[subKey] !== undefined) {
        message = message[subKey];
        subKey = "";
      }
    }
    if (typeof message !== "string" && this.messages[key.sourceFallback]) {
      message = this.messages[key.sourceFallback];
      entries = key.entries.slice();
      subKey = "";
      while (entries.length && message !== undefined) {
        var subKey = !subKey
          ? entries.shift()
          : subKey.concat(".", entries.shift());
        if (message[subKey]) {
          message = message[subKey];
          subKey = "";
        }
      }
    }
    if (typeof message !== "string") {
      return null;
    }
    return message;
  };
  Lang.prototype._findMessageInTree = function (pathSegments, tree) {
    while (pathSegments.length && tree !== undefined) {
      var dottedKey = pathSegments.join(".");
      if (tree[dottedKey]) {
        tree = tree[dottedKey];
        break;
      }
      tree = tree[pathSegments.shift()];
    }
    return tree;
  };
  Lang.prototype._applyReplacements = function (message, replacements) {
    for (var replace in replacements) {
      message = message.replace(
        new RegExp(":" + replace, "gi"),
        function (match) {
          var value = replacements[replace];
          var allCaps = match === match.toUpperCase();
          if (allCaps) {
            return value.toUpperCase();
          }
          var firstCap =
            match ===
            match.replace(/\w/i, function (letter) {
              return letter.toUpperCase();
            });
          if (firstCap) {
            return value.charAt(0).toUpperCase() + value.slice(1);
          }
          return value;
        },
      );
    }
    return message;
  };
  Lang.prototype._testInterval = function (count, interval) {
    if (typeof interval !== "string") {
      throw "Invalid interval: should be a string.";
    }
    interval = interval.trim();
    var matches = interval.match(intervalRegexp);
    if (!matches) {
      throw "Invalid interval: " + interval;
    }
    if (matches[2]) {
      var items = matches[2].split(",");
      for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i], 10) === count) {
          return true;
        }
      }
    } else {
      matches = matches.filter(function (match) {
        return !!match;
      });
      var leftDelimiter = matches[1];
      var leftNumber = convertNumber(matches[2]);
      if (leftNumber === Infinity) {
        leftNumber = -Infinity;
      }
      var rightNumber = convertNumber(matches[3]);
      var rightDelimiter = matches[4];
      return (
        (leftDelimiter === "[" ? count >= leftNumber : count > leftNumber) &&
        (rightDelimiter === "]" ? count <= rightNumber : count < rightNumber)
      );
    }
    return false;
  };
  Lang.prototype._getPluralForm = function (count) {
    switch (this.locale) {
      case "az":
      case "bo":
      case "dz":
      case "id":
      case "ja":
      case "jv":
      case "ka":
      case "km":
      case "kn":
      case "ko":
      case "ms":
      case "th":
      case "tr":
      case "vi":
      case "zh":
        return 0;
      case "af":
      case "bn":
      case "bg":
      case "ca":
      case "da":
      case "de":
      case "el":
      case "en":
      case "eo":
      case "es":
      case "et":
      case "eu":
      case "fa":
      case "fi":
      case "fo":
      case "fur":
      case "fy":
      case "gl":
      case "gu":
      case "ha":
      case "he":
      case "hu":
      case "is":
      case "it":
      case "ku":
      case "lb":
      case "ml":
      case "mn":
      case "mr":
      case "nah":
      case "nb":
      case "ne":
      case "nl":
      case "nn":
      case "no":
      case "om":
      case "or":
      case "pa":
      case "pap":
      case "ps":
      case "pt":
      case "so":
      case "sq":
      case "sv":
      case "sw":
      case "ta":
      case "te":
      case "tk":
      case "ur":
      case "zu":
        return count == 1 ? 0 : 1;
      case "am":
      case "bh":
      case "fil":
      case "fr":
      case "gun":
      case "hi":
      case "hy":
      case "ln":
      case "mg":
      case "nso":
      case "xbr":
      case "ti":
      case "wa":
        return count === 0 || count === 1 ? 0 : 1;
      case "be":
      case "bs":
      case "hr":
      case "ru":
      case "sr":
      case "uk":
        return count % 10 == 1 && count % 100 != 11
          ? 0
          : count % 10 >= 2 &&
              count % 10 <= 4 &&
              (count % 100 < 10 || count % 100 >= 20)
            ? 1
            : 2;
      case "cs":
      case "sk":
        return count == 1 ? 0 : count >= 2 && count <= 4 ? 1 : 2;
      case "ga":
        return count == 1 ? 0 : count == 2 ? 1 : 2;
      case "lt":
        return count % 10 == 1 && count % 100 != 11
          ? 0
          : count % 10 >= 2 && (count % 100 < 10 || count % 100 >= 20)
            ? 1
            : 2;
      case "sl":
        return count % 100 == 1
          ? 0
          : count % 100 == 2
            ? 1
            : count % 100 == 3 || count % 100 == 4
              ? 2
              : 3;
      case "mk":
        return count % 10 == 1 ? 0 : 1;
      case "mt":
        return count == 1
          ? 0
          : count === 0 || (count % 100 > 1 && count % 100 < 11)
            ? 1
            : count % 100 > 10 && count % 100 < 20
              ? 2
              : 3;
      case "lv":
        return count === 0 ? 0 : count % 10 == 1 && count % 100 != 11 ? 1 : 2;
      case "pl":
        return count == 1
          ? 0
          : count % 10 >= 2 &&
              count % 10 <= 4 &&
              (count % 100 < 12 || count % 100 > 14)
            ? 1
            : 2;
      case "cy":
        return count == 1
          ? 0
          : count == 2
            ? 1
            : count == 8 || count == 11
              ? 2
              : 3;
      case "ro":
        return count == 1
          ? 0
          : count === 0 || (count % 100 > 0 && count % 100 < 20)
            ? 1
            : 2;
      case "ar":
        return count === 0
          ? 0
          : count == 1
            ? 1
            : count == 2
              ? 2
              : count % 100 >= 3 && count % 100 <= 10
                ? 3
                : count % 100 >= 11 && count % 100 <= 99
                  ? 4
                  : 5;
      default:
        return 0;
    }
  };
  return Lang;
});

(function () {
  Lang = new Lang();
  Lang.setMessages({
    "de.contact": {
      email: "Email",
      email_placeholder: "maxime@musterfrau.ch",
      human: "Ich bin ein Mensch",
      message: "Nachricht",
      message_placeholder: "Liebes Xpertnet-Team...",
      name: "Name",
      name_placeholder: "Maxime Musterfrau",
      robot: "Ich bin ein Roboter",
      sent: "Das Kontaktformular wurde abgeschickt. Wir melden uns in K\u00fcrze bei Ihnen!",
      submit: "Absenden",
      title: "Kontakt",
    },
    "de.hero": {
      construction: "In Entwicklung",
      constructionDesc:
        "Diese Webseite befindet sich noch in der Entwicklung und ist daher noch nicht vollst\u00e4ndig. Ende April 2025 pr\u00e4sentieren wir Ihnen aber stolz unsere fertige Webseite!",
      description:
        "Ob Sie einen schnellen und stabilen Internetzugang f\u00fcr Ihr Zuhause oder f\u00fcr Ihr Unternehmen suchen, bei uns finden Sie ma\u00dfgeschneiderte Angebote f\u00fcr alle Anforderungen. W\u00e4hlen Sie zwischen VDSL, Fiber (Glasfaser) oder klassischen DSL-L\u00f6sungen und profitieren Sie von h\u00f6chster Qualit\u00e4t und zuverl\u00e4ssiger Leistung.",
      solution:
        "Die passgenaue Internetl\u00f6sung f\u00fcr Ihr Zuhause und Ihr Business!",
      welcome: "Willkommen bei",
    },
    "de.messages": {
      createdBy: "Von [name] mit [heart] programmiert",
      source: "Quelltext dieser Webseite",
      title:
        "Xpertnet - Die passgenaue Internetl\u00f6sung f\u00fcr Ihr Zuhause und Ihr Business!",
    },
    "de.stepper": {
      back: "Zur\u00fcck",
      next: "Weiter",
      title: "Finde dein Setup",
    },
    "de.steps": {
      availabilityD:
        "Geben Sie Ihre Adresse ein und pr\u00fcfen Sie, ob die gew\u00fcnschten Internet-Verbindungen an Ihrem Standort verf\u00fcgbar sind.",
      availabilityT: "Verf\u00fcgbarkeit pr\u00fcfen",
      chooseD:
        "W\u00e4hlen Sie das Internet-Angebot, das am besten zu Ihren Bed\u00fcrfnissen passt \u2013 ob VDSL oder Fiber (Glasfaser), f\u00fcr Zuhause oder f\u00fcr Ihr Unternehmen.",
      chooseForBusiness: "F\u00fcr Business",
      chooseForHome: "F\u00fcr Zuhause",
      chooseOptionFiberBusiness: "Business Fiber",
      chooseOptionFiberBusinessD:
        "Die perfekte L\u00f6sung f\u00fcr Unternehmen, die auf schnelle Verbindungen und h\u00f6chste Zuverl\u00e4ssigkeit angewiesen sind. Erm\u00f6glicht schnelles Arbeiten und effiziente Kommunikation im Team.",
      chooseOptionFiberHome: "Fiber (Glasfaser) Zuhause",
      chooseOptionFiberHomeD:
        "Die schnellste und zukunftssichere L\u00f6sung! Mit einer Glasfaserverbindung genie\u00dfen Sie ultraschnelles Internet und sind bestens f\u00fcr die digitale Zukunft ger\u00fcstet.",
      chooseOptionVDSLBusiness: "Business VDSL",
      chooseOptionVDSLBusinessD:
        "Hochleistungs-Internet f\u00fcr kleine und mittelst\u00e4ndische Unternehmen. Optimiert f\u00fcr mehrere Benutzer und gesch\u00e4ftliche Anwendungen.",
      chooseOptionVDSLHome: "VDSL Zuhause",
      chooseOptionVDSLHomeD:
        "Profitieren Sie von zuverl\u00e4ssigem Internet mit stabiler Geschwindigkeit f\u00fcr Ihr Heimnetzwerk. Ideal f\u00fcr Streaming, Gaming und Homeoffice.",
      chooseT: "W\u00e4hlen Sie Ihr Produkt",
      installationProD:
        "Wenn Sie lieber einen Experten f\u00fcr die Installation Ihres Netzwerks haben m\u00f6chten, buchen Sie unseren Profi-Installationsservice und lassen Sie sich bei der Einrichtung Ihrer Ger\u00e4te unterst\u00fctzen.",
      installationProT: "Installation durch einen Profi",
      installationSelfD:
        "Wenn Sie es bevorzugen, Ihr Internet selbst zu installieren, bieten wir Ihnen eine detaillierte Anleitung und Support per Telefon oder E-Mail.",
      installationSelfT: "Internet selbst installieren",
      installationT: "Installation - Selbst oder mit Profi?",
      number: "Hausnummer",
      numberPlaceholder: "1",
      place: "Ort",
      placePlaceholder: "Z\u00fcrich",
      postal: "PLZ",
      postalPlaceholder: "8000",
      routerD:
        "W\u00e4hlen Sie den passenden Router f\u00fcr Ihre Verbindung aus. Wir empfehlen die FRITZ!Box Modelle, die f\u00fcr ihre Zuverl\u00e4ssigkeit und einfache Bedienung bekannt sind.",
      routerFritz:
        "Fritzboxen \u2013 Die perfekte Wahl f\u00fcr Zuhause und Business",
      routerFritzD:
        "Wir bieten Ihnen die besten Router f\u00fcr Ihre Bed\u00fcrfnisse. Die Standard-Router, die wir anbieten, sind leistungsstark, zuverl\u00e4ssig und einfach zu konfigurieren.",
      routerT: "Router-Auswahl",
      routerVDSL5530: "FRITZ!Box 5530 (VDSL)",
      routerVDSL5530D:
        "Kompakter VDSL-Router mit allem, was Sie f\u00fcr einen stabilen Internetzugang ben\u00f6tigen.",
      routerVDSL7530: "FRITZ!Box 7530 (VDSL) inkl. Modem-Kabel",
      routerVDSL7530D:
        "Leistungsstark und einfach zu bedienen. Ideal f\u00fcr gr\u00f6\u00dfere Haushalte oder kleine Unternehmen.",
      routerxDSL7530AX: "FRITZ!Box 7530AX (xDSL)",
      routerxDSL7530AXD:
        "Mit Wi-Fi 6 f\u00fcr h\u00f6here Geschwindigkeiten und bessere Reichweite. Perfekt f\u00fcr moderne Haushalte und kleinere B\u00fcros.",
      search: "Suchen",
      setupComplexD:
        "Ben\u00f6tigen Sie eine komplexe Netzwerkinstallation? Kein Problem! Unser Profi-Service steht bereit, um Ihnen zu helfen und Ihre Installation schnell und effizient umzusetzen.",
      setupComplexT: "Aufwendige Installation",
      setupEasyD:
        "Wenn Sie ein einfaches Netzwerk zu Hause oder im B\u00fcro aufbauen m\u00f6chten, k\u00f6nnen Sie die Installation ganz einfach selbst vornehmen.",
      setupEasyT: "Einfaches Netzwerk",
      setupT: "Installation \u2013 Einfach oder Profi?",
      street: "Strasse",
      streetPlaceholder: "Musterstrasse",
      title: "Wie funktioniert's?",
    },
    "de.validation": {
      accepted: "Dieses Feld muss akzeptiert werden.",
      accepted_if:
        "The :attribute field must be accepted when :other is :value.",
      active_url: "The :attribute field must be a valid URL.",
      after: "The :attribute field must be a date after :date.",
      after_or_equal:
        "The :attribute field must be a date after or equal to :date.",
      alpha: "The :attribute field must only contain letters.",
      alpha_dash:
        "The :attribute field must only contain letters, numbers, dashes, and underscores.",
      alpha_num: "The :attribute field must only contain letters and numbers.",
      array: "The :attribute field must be an array.",
      ascii:
        "The :attribute field must only contain single-byte alphanumeric characters and symbols.",
      attributes: [],
      before: "The :attribute field must be a date before :date.",
      before_or_equal:
        "The :attribute field must be a date before or equal to :date.",
      between: {
        array: "The :attribute field must have between :min and :max items.",
        file: "The :attribute field must be between :min and :max kilobytes.",
        numeric: "The :attribute field must be between :min and :max.",
        string:
          "The :attribute field must be between :min and :max characters.",
      },
      boolean: "The :attribute field must be true or false.",
      can: "The :attribute field contains an unauthorized value.",
      confirmed: "The :attribute field confirmation does not match.",
      contains: "The :attribute field is missing a required value.",
      current_password: "The password is incorrect.",
      custom: { "attribute-name": { "rule-name": "custom-message" } },
      date: "The :attribute field must be a valid date.",
      date_equals: "The :attribute field must be a date equal to :date.",
      date_format: "The :attribute field must match the format :format.",
      decimal: "The :attribute field must have :decimal decimal places.",
      declined: "Dieses Feld darf nicht akzeptiert werden.",
      declined_if:
        "The :attribute field must be declined when :other is :value.",
      different: "The :attribute field and :other must be different.",
      digits: "The :attribute field must be :digits digits.",
      digits_between:
        "The :attribute field must be between :min and :max digits.",
      dimensions: "The :attribute field has invalid image dimensions.",
      distinct: "The :attribute field has a duplicate value.",
      doesnt_end_with:
        "The :attribute field must not end with one of the following: :values.",
      doesnt_start_with:
        "The :attribute field must not start with one of the following: :values.",
      email: "Das :attribute Feld muss eine valide E-Mail Adresse sein.",
      ends_with:
        "The :attribute field must end with one of the following: :values.",
      enum: "The selected :attribute is invalid.",
      exists: "The selected :attribute is invalid.",
      extensions:
        "The :attribute field must have one of the following extensions: :values.",
      file: "The :attribute field must be a file.",
      filled: "The :attribute field must have a value.",
      gt: {
        array: "The :attribute field must have more than :value items.",
        file: "The :attribute field must be greater than :value kilobytes.",
        numeric: "The :attribute field must be greater than :value.",
        string: "The :attribute field must be greater than :value characters.",
      },
      gte: {
        array: "The :attribute field must have :value items or more.",
        file: "The :attribute field must be greater than or equal to :value kilobytes.",
        numeric:
          "The :attribute field must be greater than or equal to :value.",
        string:
          "The :attribute field must be greater than or equal to :value characters.",
      },
      hex_color: "The :attribute field must be a valid hexadecimal color.",
      image: "The :attribute field must be an image.",
      in: "The selected :attribute is invalid.",
      in_array: "The :attribute field must exist in :other.",
      integer: "The :attribute field must be an integer.",
      ip: "The :attribute field must be a valid IP address.",
      ipv4: "The :attribute field must be a valid IPv4 address.",
      ipv6: "The :attribute field must be a valid IPv6 address.",
      json: "The :attribute field must be a valid JSON string.",
      list: "The :attribute field must be a list.",
      lowercase: "The :attribute field must be lowercase.",
      lt: {
        array: "The :attribute field must have less than :value items.",
        file: "The :attribute field must be less than :value kilobytes.",
        numeric: "The :attribute field must be less than :value.",
        string: "The :attribute field must be less than :value characters.",
      },
      lte: {
        array: "The :attribute field must not have more than :value items.",
        file: "The :attribute field must be less than or equal to :value kilobytes.",
        numeric: "The :attribute field must be less than or equal to :value.",
        string:
          "The :attribute field must be less than or equal to :value characters.",
      },
      mac_address: "The :attribute field must be a valid MAC address.",
      max: {
        array: "The :attribute field must not have more than :max items.",
        file: "The :attribute field must not be greater than :max kilobytes.",
        numeric: "The :attribute field must not be greater than :max.",
        string:
          "The :attribute field must not be greater than :max characters.",
      },
      max_digits: "The :attribute field must not have more than :max digits.",
      mimes: "The :attribute field must be a file of type: :values.",
      mimetypes: "The :attribute field must be a file of type: :values.",
      min: {
        array: "The :attribute field must have at least :min items.",
        file: "The :attribute field must be at least :min kilobytes.",
        numeric: "The :attribute field must be at least :min.",
        string: "The :attribute field must be at least :min characters.",
      },
      min_digits: "The :attribute field must have at least :min digits.",
      missing: "The :attribute field must be missing.",
      missing_if: "The :attribute field must be missing when :other is :value.",
      missing_unless:
        "The :attribute field must be missing unless :other is :value.",
      missing_with:
        "The :attribute field must be missing when :values is present.",
      missing_with_all:
        "The :attribute field must be missing when :values are present.",
      multiple_of: "The :attribute field must be a multiple of :value.",
      not_in: "The selected :attribute is invalid.",
      not_regex: "The :attribute field format is invalid.",
      numeric: "The :attribute field must be a number.",
      password: {
        letters: "The :attribute field must contain at least one letter.",
        mixed:
          "The :attribute field must contain at least one uppercase and one lowercase letter.",
        numbers: "The :attribute field must contain at least one number.",
        symbols: "The :attribute field must contain at least one symbol.",
        uncompromised:
          "The given :attribute has appeared in a data leak. Please choose a different :attribute.",
      },
      present: "The :attribute field must be present.",
      present_if: "The :attribute field must be present when :other is :value.",
      present_unless:
        "The :attribute field must be present unless :other is :value.",
      present_with:
        "The :attribute field must be present when :values is present.",
      present_with_all:
        "The :attribute field must be present when :values are present.",
      prohibited: "The :attribute field is prohibited.",
      prohibited_if:
        "The :attribute field is prohibited when :other is :value.",
      prohibited_if_accepted:
        "The :attribute field is prohibited when :other is accepted.",
      prohibited_if_declined:
        "The :attribute field is prohibited when :other is declined.",
      prohibited_unless:
        "The :attribute field is prohibited unless :other is in :values.",
      prohibits: "The :attribute field prohibits :other from being present.",
      regex: "The :attribute field format is invalid.",
      required: "Dies ist ein Pflichtfeld.",
      required_array_keys:
        "The :attribute field must contain entries for: :values.",
      required_if: "The :attribute field is required when :other is :value.",
      required_if_accepted:
        "The :attribute field is required when :other is accepted.",
      required_if_declined:
        "The :attribute field is required when :other is declined.",
      required_unless:
        "The :attribute field is required unless :other is in :values.",
      required_with:
        "The :attribute field is required when :values is present.",
      required_with_all:
        "The :attribute field is required when :values are present.",
      required_without:
        "The :attribute field is required when :values is not present.",
      required_without_all:
        "The :attribute field is required when none of :values are present.",
      same: "The :attribute field must match :other.",
      size: {
        array: "The :attribute field must contain :size items.",
        file: "The :attribute field must be :size kilobytes.",
        numeric: "The :attribute field must be :size.",
        string: "The :attribute field must be :size characters.",
      },
      starts_with:
        "The :attribute field must start with one of the following: :values.",
      string: "The :attribute field must be a string.",
      timezone: "The :attribute field must be a valid timezone.",
      ulid: "The :attribute field must be a valid ULID.",
      unique: "The :attribute has already been taken.",
      uploaded: "The :attribute failed to upload.",
      uppercase: "The :attribute field must be uppercase.",
      url: "The :attribute field must be a valid URL.",
      uuid: "The :attribute field must be a valid UUID.",
    },
    "en.auth": {
      failed: "These credentials do not match our records.",
      password: "The provided password is incorrect.",
      throttle:
        "Too many login attempts. Please try again in :seconds seconds.",
    },
    "en.contact": {
      email: "Email",
      email_placeholder: "maxime@musterfrau.ch",
      human: "I am a Human",
      message: "Message",
      message_placeholder: "Dear Xpertnet-Team...",
      name: "Name",
      name_placeholder: "Maxime Musterfrau",
      robot: "I am a Robot",
      sent: "The contact form was submitted. We'll get in touch with you shortly!",
      submit: "Submit",
      title: "Contact Us",
    },
    "en.hero": {
      construction: "Under Construction",
      constructionDesc:
        "This website is currently being built and is therefore not feature complete yet. We'll be proud to present our finished website at the end of April 2025!",
      description:
        "Whether you are looking for fast and stable Internet access for your home or for your company, we have customised offers for all requirements. Choose between VDSL, fibre optic or classic DSL solutions and benefit from the highest quality and reliable performance.",
      solution: "The perfect internet fit for your home and your business!",
      welcome: "Welcome to",
    },
    "en.messages": {
      createdBy: "Created with [heart] by [name] ",
      source: "Source code of this website",
      title:
        "Xpertnet - The perfect internet fit for your home and your business!",
    },
    "en.pagination": { next: "Next &raquo;", previous: "&laquo; Previous" },
    "en.passwords": {
      reset: "Your password has been reset.",
      sent: "We have emailed your password reset link.",
      throttled: "Please wait before retrying.",
      token: "This password reset token is invalid.",
      user: "We can't find a user with that email address.",
    },
    "en.stepper": { back: "Back", next: "Next", title: "Get your Setup" },
    "en.steps": {
      availabilityD:
        "Enter your address and check whether the desired Internet connections are available at your location.",
      availabilityT: "Check availability",
      chooseD:
        "Choose the Internet offer that best suits your needs - whether VDSL or fiber, for your home or for your business.",
      chooseForBusiness: "For Businesses",
      chooseForHome: "For Home Use",
      chooseOptionFiberBusiness: "Business Fiber",
      chooseOptionFiberBusinessD:
        "The perfect solution for companies that depend on fast connections and maximum reliability. Enables fast working and efficient team communication.",
      chooseOptionFiberHome: "Fiber at Home",
      chooseOptionFiberHomeD:
        "The fastest and future-proof solution! With a fiber optic connection, you can enjoy ultra-fast Internet and are ideally equipped for the digital future.",
      chooseOptionVDSLBusiness: "Business VDSL",
      chooseOptionVDSLBusinessD:
        "High-performance Internet for small and medium-sized businesses. Optimized for multiple users and business applications.",
      chooseOptionVDSLHome: "VDSL at Home",
      chooseOptionVDSLHomeD:
        "Benefit from reliable Internet with stable speed for your home network. Ideal for streaming, gaming and working from home.",
      chooseT: "Choose your product",
      installationProD:
        "If you would rather have an expert install your network, book our professional installation service and let us help you set up your devices.",
      installationProT: "Installation by a professional",
      installationSelfD:
        "If you prefer to install your Internet yourself, we will provide you with detailed instructions and support by phone or e-mail.",
      installationSelfT: "Install the Internet yourself",
      installationT: "Installation - do it yourself or with a professional?",
      number: "Number",
      numberPlaceholder: "1",
      place: "Place",
      placePlaceholder: "Z\u00fcrich",
      postal: "Postal Code",
      postalPlaceholder: "8000",
      routerD:
        "Select the right router for your connection. We recommend the FRITZ!Box models, which are known for their reliability and ease of use.",
      routerFritz: "Fritzboxes - The perfect choice for home and business",
      routerFritzD:
        "We offer you the best routers for your needs. The standard routers we offer are powerful, reliable and easy to configure.",
      routerT: "Router selection",
      routerVDSL5530: "FRITZ!Box 5530 (VDSL)",
      routerVDSL5530D:
        "Compact VDSL router with everything you need for stable Internet access.",
      routerVDSL7530: "FRITZ!Box 7530 (VDSL) incl. modem cable",
      routerVDSL7530D:
        "Powerful and easy to use. Ideal for larger households or small businesses.",
      routerxDSL7530AX: "FRITZ!Box 7530AX (xDSL)",
      routerxDSL7530AXD:
        "With Wi-Fi 6 for higher speeds and better range. Perfect for modern homes and small offices.",
      search: "Search",
      setupComplexD:
        "Do you need a complex network installation? No problem! Our professional service is ready to help you and implement your installation quickly and efficiently.",
      setupComplexT: "Complex installation",
      setupEasyD:
        "If you want to set up a simple network at home or in the office, you can easily do the installation yourself.",
      setupEasyT: "Simple network",
      setupT: "Installation - Easy or Professional?",
      street: "Street",
      streetPlaceholder: "Some Ave.",
      title: "How does it work?",
    },
    "en.validation": {
      accepted: "The :attribute field must be accepted.",
      accepted_if:
        "The :attribute field must be accepted when :other is :value.",
      active_url: "The :attribute field must be a valid URL.",
      after: "The :attribute field must be a date after :date.",
      after_or_equal:
        "The :attribute field must be a date after or equal to :date.",
      alpha: "The :attribute field must only contain letters.",
      alpha_dash:
        "The :attribute field must only contain letters, numbers, dashes, and underscores.",
      alpha_num: "The :attribute field must only contain letters and numbers.",
      array: "The :attribute field must be an array.",
      ascii:
        "The :attribute field must only contain single-byte alphanumeric characters and symbols.",
      attributes: [],
      before: "The :attribute field must be a date before :date.",
      before_or_equal:
        "The :attribute field must be a date before or equal to :date.",
      between: {
        array: "The :attribute field must have between :min and :max items.",
        file: "The :attribute field must be between :min and :max kilobytes.",
        numeric: "The :attribute field must be between :min and :max.",
        string:
          "The :attribute field must be between :min and :max characters.",
      },
      boolean: "The :attribute field must be true or false.",
      can: "The :attribute field contains an unauthorized value.",
      confirmed: "The :attribute field confirmation does not match.",
      contains: "The :attribute field is missing a required value.",
      current_password: "The password is incorrect.",
      custom: { "attribute-name": { "rule-name": "custom-message" } },
      date: "The :attribute field must be a valid date.",
      date_equals: "The :attribute field must be a date equal to :date.",
      date_format: "The :attribute field must match the format :format.",
      decimal: "The :attribute field must have :decimal decimal places.",
      declined: "The :attribute field must be declined.",
      declined_if:
        "The :attribute field must be declined when :other is :value.",
      different: "The :attribute field and :other must be different.",
      digits: "The :attribute field must be :digits digits.",
      digits_between:
        "The :attribute field must be between :min and :max digits.",
      dimensions: "The :attribute field has invalid image dimensions.",
      distinct: "The :attribute field has a duplicate value.",
      doesnt_end_with:
        "The :attribute field must not end with one of the following: :values.",
      doesnt_start_with:
        "The :attribute field must not start with one of the following: :values.",
      email: "The :attribute field must be a valid email address.",
      ends_with:
        "The :attribute field must end with one of the following: :values.",
      enum: "The selected :attribute is invalid.",
      exists: "The selected :attribute is invalid.",
      extensions:
        "The :attribute field must have one of the following extensions: :values.",
      file: "The :attribute field must be a file.",
      filled: "The :attribute field must have a value.",
      gt: {
        array: "The :attribute field must have more than :value items.",
        file: "The :attribute field must be greater than :value kilobytes.",
        numeric: "The :attribute field must be greater than :value.",
        string: "The :attribute field must be greater than :value characters.",
      },
      gte: {
        array: "The :attribute field must have :value items or more.",
        file: "The :attribute field must be greater than or equal to :value kilobytes.",
        numeric:
          "The :attribute field must be greater than or equal to :value.",
        string:
          "The :attribute field must be greater than or equal to :value characters.",
      },
      hex_color: "The :attribute field must be a valid hexadecimal color.",
      image: "The :attribute field must be an image.",
      in: "The selected :attribute is invalid.",
      in_array: "The :attribute field must exist in :other.",
      integer: "The :attribute field must be an integer.",
      ip: "The :attribute field must be a valid IP address.",
      ipv4: "The :attribute field must be a valid IPv4 address.",
      ipv6: "The :attribute field must be a valid IPv6 address.",
      json: "The :attribute field must be a valid JSON string.",
      list: "The :attribute field must be a list.",
      lowercase: "The :attribute field must be lowercase.",
      lt: {
        array: "The :attribute field must have less than :value items.",
        file: "The :attribute field must be less than :value kilobytes.",
        numeric: "The :attribute field must be less than :value.",
        string: "The :attribute field must be less than :value characters.",
      },
      lte: {
        array: "The :attribute field must not have more than :value items.",
        file: "The :attribute field must be less than or equal to :value kilobytes.",
        numeric: "The :attribute field must be less than or equal to :value.",
        string:
          "The :attribute field must be less than or equal to :value characters.",
      },
      mac_address: "The :attribute field must be a valid MAC address.",
      max: {
        array: "The :attribute field must not have more than :max items.",
        file: "The :attribute field must not be greater than :max kilobytes.",
        numeric: "The :attribute field must not be greater than :max.",
        string:
          "The :attribute field must not be greater than :max characters.",
      },
      max_digits: "The :attribute field must not have more than :max digits.",
      mimes: "The :attribute field must be a file of type: :values.",
      mimetypes: "The :attribute field must be a file of type: :values.",
      min: {
        array: "The :attribute field must have at least :min items.",
        file: "The :attribute field must be at least :min kilobytes.",
        numeric: "The :attribute field must be at least :min.",
        string: "The :attribute field must be at least :min characters.",
      },
      min_digits: "The :attribute field must have at least :min digits.",
      missing: "The :attribute field must be missing.",
      missing_if: "The :attribute field must be missing when :other is :value.",
      missing_unless:
        "The :attribute field must be missing unless :other is :value.",
      missing_with:
        "The :attribute field must be missing when :values is present.",
      missing_with_all:
        "The :attribute field must be missing when :values are present.",
      multiple_of: "The :attribute field must be a multiple of :value.",
      not_in: "The selected :attribute is invalid.",
      not_regex: "The :attribute field format is invalid.",
      numeric: "The :attribute field must be a number.",
      password: {
        letters: "The :attribute field must contain at least one letter.",
        mixed:
          "The :attribute field must contain at least one uppercase and one lowercase letter.",
        numbers: "The :attribute field must contain at least one number.",
        symbols: "The :attribute field must contain at least one symbol.",
        uncompromised:
          "The given :attribute has appeared in a data leak. Please choose a different :attribute.",
      },
      present: "The :attribute field must be present.",
      present_if: "The :attribute field must be present when :other is :value.",
      present_unless:
        "The :attribute field must be present unless :other is :value.",
      present_with:
        "The :attribute field must be present when :values is present.",
      present_with_all:
        "The :attribute field must be present when :values are present.",
      prohibited: "The :attribute field is prohibited.",
      prohibited_if:
        "The :attribute field is prohibited when :other is :value.",
      prohibited_if_accepted:
        "The :attribute field is prohibited when :other is accepted.",
      prohibited_if_declined:
        "The :attribute field is prohibited when :other is declined.",
      prohibited_unless:
        "The :attribute field is prohibited unless :other is in :values.",
      prohibits: "The :attribute field prohibits :other from being present.",
      regex: "The :attribute field format is invalid.",
      required: "The :attribute field is required.",
      required_array_keys:
        "The :attribute field must contain entries for: :values.",
      required_if: "The :attribute field is required when :other is :value.",
      required_if_accepted:
        "The :attribute field is required when :other is accepted.",
      required_if_declined:
        "The :attribute field is required when :other is declined.",
      required_unless:
        "The :attribute field is required unless :other is in :values.",
      required_with:
        "The :attribute field is required when :values is present.",
      required_with_all:
        "The :attribute field is required when :values are present.",
      required_without:
        "The :attribute field is required when :values is not present.",
      required_without_all:
        "The :attribute field is required when none of :values are present.",
      same: "The :attribute field must match :other.",
      size: {
        array: "The :attribute field must contain :size items.",
        file: "The :attribute field must be :size kilobytes.",
        numeric: "The :attribute field must be :size.",
        string: "The :attribute field must be :size characters.",
      },
      starts_with:
        "The :attribute field must start with one of the following: :values.",
      string: "The :attribute field must be a string.",
      timezone: "The :attribute field must be a valid timezone.",
      ulid: "The :attribute field must be a valid ULID.",
      unique: "The :attribute has already been taken.",
      uploaded: "The :attribute failed to upload.",
      uppercase: "The :attribute field must be uppercase.",
      url: "The :attribute field must be a valid URL.",
      uuid: "The :attribute field must be a valid UUID.",
    },
  });
})();
