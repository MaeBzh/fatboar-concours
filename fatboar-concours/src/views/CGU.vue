<template>
  <v-container>
    <v-card class="pa-8">
      <v-card-title>Conditions générales d'utilisation</v-card-title>

      <v-card-subtitle>En vigueur au 05/05/2022</v-card-subtitle>

      <p>
        Les présentes conditions générales d'utilisation (dites « CGU ») ont
        pour objet l'encadrement juridique des modalités de mise à disposition
        du site et des services par Fatboar et de définir les conditions d'accès
        et d'utilisation des services par « l'utilisateur ».
      </p>
      <p>Les présentes CGU sont accessibles sur le site à la rubrique «CGU».</p>
      <p>
        Toute inscription ou utilisation du site implique l'acceptation sans
        aucune réserve ni restriction des présentes CGU par l'utilisateur. Lors
        de l'inscription sur le site via le formulaire d'inscription, chaque
        utilisateur accepte expressément les présentes CGU en cochant la case
        précédant le texte suivant : « Je reconnais avoir lu et compris les CGU
        et je les accepte ».
      </p>
      <p>
        En cas de non-acceptation des CGU stipulées dans le présent contrat,
        l'Utilisateur se doit de renoncer à l'accès des services proposés par le
        site.
      </p>
      <p>
        www.fatboar-concours.com se réserve le droit de modifier unilatéralement
        et à tout moment le contenu des présentes CGU.
      </p>
      <h4 class="primary--text">ARTICLE 1 : Accès au site</h4>

      <p>
        Le site www.fatboar-concours.com permet à l'utilisateur un accès gratuit
        aux services suivants : Participation au jeu-concours, consultation de
        l'historique des gains, création de compte, modification des
        informations de profil
      </p>
      <p>
        Le site est accessible gratuitement en tout lieu à tout utilisateur
        ayant un accès à internet. Tous les frais supportés par l'utilisateur
        pour accéder au service (matériel informatique, logiciels, connexion
        Internet, etc.) sont à sa charge.
      </p>
      <p>
        L'Utilisateur non membre n'a pas accès aux services réservés. Pour cela,
        il doit s'inscrire en remplissant le formulaire. En acceptant de
        s'inscrire aux services réservés, l'utilisateur membre s'engage à
        fournir des informations sincères et exactes concernant son état civil
        et ses coordonnées, notamment son adresse email.
      </p>
      <p>
        Pour accéder aux services, l'utilisateur doit ensuite s'identifier à
        l'aide de son identifiant et de son mot de passe qui lui seront
        communiqués après son inscription.
      </p>
      <p>
        Tout utilisateur membre régulièrement inscrit pourra également
        solliciter sa désinscription en se rendant à la page dédiée sur son
        espace personnel. Celle-ci sera effective dans un délai raisonnable.
        Tout événement dû à un cas de force majeure ayant pour conséquence un
        dysfonctionnement du site ou serveur et sous réserve de toute
        interruption ou modification en cas de maintenance, n'engage pas la
        responsabilité de www.fatboar-concours.com. Dans ces cas, l'utilisateur
        accepte ainsi ne pas tenir rigueur à l'éditeur de toute interruption ou
        suspension de service, même sans préavis. L'Utilisateur a la possibilité
        de contacter le site par messagerie électronique à l'adresse email de
        l'éditeur communiqué à l'ARTICLE 1.
      </p>
      <h4 class="primary--text">ARTICLE 4 : Propriété intellectuelle</h4>

      <p>
        Les marques, logos, signes ainsi que tous les contenus du site (textes,
        images, son...) font l'objet d'une protection par le Code de la
        propriété intellectuelle et plus particulièrement par le droit d'auteur.
        La marque Fatboar est une marque déposée par Éric Bourdon.Toute
        représentation et/ou reproduction et/ou exploitation partielle ou totale
        de cette marque, de quelque nature que ce soit, est totalement prohibée.
      </p>
      <p>
        L'utilisateur doit solliciter l'autorisation préalable du site pour
        toute reproduction, publication, copie des différents contenus. Il
        s'engage à une utilisation des contenus du site dans un cadre
        strictement privé, toute utilisation à des fins commerciales et
        publicitaires est strictement interdite. Toute représentation totale ou
        partielle de ce site par quelque procédé que ce soit, sans
        l'autorisation expresse de l'exploitant du site Internet constituerait
        une contrefaçon sanctionnée par l'article L 335-2 et suivants du Code de
        la propriété intellectuelle.
      </p>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  metaInfo() {
    return {
      title: "Conditions générales d'utilisation",
      content:
        "Liste des conditions générales d'utilisation pour participer au jeu-concours organisé par Fatboar.",
    };
  },
})
export default class CGU extends Vue {}
</script>
