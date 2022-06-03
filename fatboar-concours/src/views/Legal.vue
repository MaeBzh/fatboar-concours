<template>
  <v-container>
    <v-card class="legal pa-8">
      <v-card-title class="card-title">Mentions légales</v-card-title>
      <v-card-subtitle>En vigueur au 05/05/2022</v-card-subtitle>
      <v-card-text>
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie
          numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs, ci-après l'"utilisateur", du site
          www.fatboar-concours.com , ci-après le "site", les présentes mentions
          légales.
        </p>
        <p>
          La connexion et la navigation sur le site par l'utilisateur implique
          acceptation intégrale et sans réserve des présentes mentions légales.
          Ces dernières sont accessibles sur le site à la rubrique « Mentions
          légales ».
        </p>

        <h3 class="primary--text">ARTICLE 1 - L'EDITEUR</h3>
        <p>
          L'édition du site est assurée par Fatboar SA au capital de 750,000
          euros, immatriculée au Registre du Commerce et des Sociétés de
          GUYANCOURT sous le numéro 532671260 dont le siège social est situé au
          :
        </p>
        <address>
          1 bis rue Gustave Eiffel 78280 GUYANCOURT<br />
          Numéro de téléphone : 01 30 43 41 36<br />
          Adresse e-mail : v.giraud@fatboar.com<br />
          N° de TVA intracommunautaire : FR96532671260
        </address>
        <br />
        <p>
          Le Directeur de la publication est Éric Bourdon ci-après l'"éditeur".
        </p>
        <h3 class="primary--text">ARTICLE 2 - L'HEBERGEUR</h3>
        <p>
          L'hébergeur du Site est la société Infomaniak, dont le siège social
          est situé :
        </p>
        <address>
          rue Eugène-Marziano 25<br />
          1227 Les Acacias<br />
          Suisse <br />
          Numéro de téléphone : +41 844551155 <br />
          Adresse email : http://www.infomaniak.ch
        </address>
        <br />
        <h3 class="primary--text">ARTICLE 3 - ACCES AU SITE</h3>
        <p>
          Le site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force
          majeure, interruption programmée ou non et pouvant découlant d'une
          nécessité de maintenance. En cas de modification, interruption ou
          suspension du Site, l'Editeur ne saurait être tenu responsable.
        </p>
        <h3 class="primary--text">ARTICLE 4 - COLLECTE DES DONNEES</h3>
        <p>
          Le site assure à l'utilisateur une collecte et un traitement
          d'informations personnelles dans le respect de la vie privée
          conformément à la loi n°78-17 du 6 janvier 1978 relative à
          l'informatique, aux fichiers et aux libertés.
        </p>
        <p>
          En vertu de la loi Informatique et Libertés, en date du 6 janvier
          1978, l'utilisateur dispose d'un droit d'accès, de rectification, de
          suppression et d'opposition de ses données personnelles. L'utilisateur
          exerce ce droit :
        </p>
        <ul>
          <li>par mail à l'adresse email contact@fatboar.fr</li>
          <li>via un formulaire de contact</li>
          <li>via son espace personnel</li>
        </ul>
        <br />
        <p>
          Toute utilisation, reproduction, diffusion, commercialisation,
          modification de toute ou partie du site, sans autorisation de
          l'éditeur est prohibée et pourra entraîner des actions et poursuites
          judiciaires telles que notamment prévues par le Code de la propriété
          intellectuelle et le Code civil.
        </p>
        <p>
          Pour plus d'informations, se reporter aux CGU du site
          www.fatboar-concours.com accessible à la rubrique "CGU" <br />
          Pour plus d'informations en matière de protection des données à
          caractère personnel , se reporter à la Charte en matière de protection
          des données à caractère personnel du site www.fatboar-concours.com
          accessible à la rubrique "Données personnelles". <br />
          Pour plus d'informations en matière de cookies, se reporter à la
          Charte en matière de cookies du site www.fatboar-concours.com
          accessible à la rubrique "Paramètrage des cookies"
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  metaInfo() {
    return {
      title: "Mentions légales",
      content: "Mentions légales concernant le site du jeu-concours organis par les restaurants de gibier Fatboar",
    };
  },
})
export default class Legal extends Vue {}
</script>
