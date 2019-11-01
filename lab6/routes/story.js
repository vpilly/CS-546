const express = require("express");
const router = express.Router();

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras non dictum mi.Nam ultricies blandit lectus, vitae mollis sapien mollis vitae.Donec ut leo ut nisi porta lacinia.Phasellus lobortis lacus nec est ullamcorper sollicitudin.Quisque consequat in orci vel elementum.Vivamus ac tempus justo, at rhoncus metus.Fusce purus arcu, auctor vehicula rhoncus nec, egestas et tortor.In hac habitasse platea dictumst.Integer purus dolor, ullamcorper eu porttitor at, rhoncus a nulla.Sed sollicitudin, turpis in finibus venenatis, purus nisl dictum velit, nec euismod quam elit in magna.Ut id sollicitudin mauris.Curabitur rhoncus euismod neque in rutrum.Phasellus pellentesque tortor tristique metus eleifend, id placerat tellus faucibus.Sed ac eros at velit rhoncus tempus a ullamcorper libero.Aenean porta, sem ac luctus mollis, ante justo vehicula turpis, non fringilla eros neque in metus.Vestibulum risus ligula, viverra vel orci vel, egestas lacinia augue.\nMauris molestie vulputate tellus, eu elementum justo commodo quis.Cras sit amet est non nunc sodales porttitor.Suspendisse potenti.Ut lobortis malesuada ante tempor convallis.Curabitur ac commodo diam.Mauris elit lacus, vestibulum eu vulputate at, auctor vitae risus.Nunc ultricies ligula nec dapibus ullamcorper.Donec a tortor vitae turpis fermentum viverra.Vestibulum eu ante nulla.Duis a nulla rhoncus, egestas nunc sit amet, porta lectus.Praesent pharetra, libero nec placerat placerat, ipsum turpis dictum ligula, eu gravida justo ipsum nec odio.Quisque molestie quam in tellus faucibus, tristique faucibus metus scelerisque.Phasellus nulla ligula, placerat ac sem et, consequat lobortis ipsum.Donec at eleifend metus.In ornare est ut volutpat dapibus.\nSuspendisse vitae metus mattis, consequat risus ac, aliquet diam.Integer ullamcorper, dolor in lobortis consectetur, erat quam pretium est, id tincidunt ex ipsum vel urna.Cras in nisi ligula.In et dapibus nulla.Duis nunc elit, ultrices in turpis a, consectetur blandit ligula.In massa metus, feugiat ut leo id, auctor ullamcorper lacus.Donec dui magna, aliquet ac dictum ut, imperdiet quis tortor.Nullam quis ex nulla.Sed condimentum pulvinar neque sit amet cursus.Donec egestas, arcu at bibendum scelerisque, ante ex ullamcorper libero, sit amet pellentesque eros massa non felis.Sed ut nisi in eros placerat ultricies nec nec tortor.Duis posuere, leo non tincidunt vehicula, augue odio ornare dui, at volutpat magna lectus et nulla.\nVestibulum in justo accumsan, mattis tellus ut, commodo ligula.Quisque non ligula scelerisque, eleifend urna non, mattis elit.Integer sapien turpis, vulputate nec felis in, pulvinar pellentesque massa.Praesent in ultrices leo.Sed vel nunc non lectus ultrices porta.Fusce finibus dignissim neque vitae accumsan.Pellentesque massa dolor, efficitur congue accumsan eu, dictum a quam.Aenean tincidunt turpis at ultricies feugiat.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Quisque convallis sit amet felis id finibus.\nMauris convallis facilisis vehicula.Duis convallis nisl vel vehicula ultricies.Praesent at sollicitudin purus.Morbi aliquet dapibus luctus.Nulla venenatis dui leo, ut ullamcorper urna malesuada ac.Nam tempor id justo a faucibus.Fusce ultrices posuere enim in lacinia.Sed purus massa, ullamcorper eget semper ut, placerat vitae metus.Nullam dolor velit, maximus eget metus a, accumsan pellentesque nunc.Quisque enim dui, ornare nec elit at, scelerisque venenatis ipsum.Etiam ullamcorper in orci eu congue.Curabitur vitae nunc ornare, interdum quam eu, molestie ligula.Fusce elementum ex sit amet convallis commodo.Duis placerat quam ut dui convallis feugiat.";

router.get("/", async (req, res) => {
    try {
        const info = {
            "storyTitle": "Lorem Ipsum",
            "story": lorem
        }
        res.json(info);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

module.exports = router;
