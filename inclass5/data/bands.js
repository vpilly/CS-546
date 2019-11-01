const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

let exportedMethods = {
  async getAllBands() {
    if (arguments.length !== 0) throw "Error: incorrect number of arguments";
    //TODO: Return an array of all bands from the DB
    const bandsCollection = await bands();
    const bandList = await bandsCollection.find({}).toArray();
    return bandList;
  },
  async getBandById(id) {
    //TODO: Return a band from the DB based on the ID
    if (arguments.length !== 1) throw `function getBandById() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw "id must be given in string format in function getBandById()";

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `invalid given id: ${id} in function getBandById()`;
    const bandsCollection = await bands();
    const band = await bandsCollection.findOne({ _id: objId });
    if (band === null) throw `no band with given id: ${id} in function getBandById()`;

    return band;
  },
  async addBand(bandName, bandMembers, yearFormed, genres, recordLabel) {
    if (arguments.length !== 5) throw `function addBand() expected 5 parameters but instead received ${arguments.length}`;
    if (typeof (bandName) !== "string") throw "bandName must be a string";
    if (!Array.isArray(bandMembers)) throw "bandMembers must be given in an array";
    if (bandMembers.length < 1) throw "bandMembers must have atleast one element";
    for (const member of bandMembers) {
      if (member.firstName === undefined || member.lastName === undefined) throw "bandMembers has invalid element inside of it";
      if (typeof (member.firstName) !== "string" || typeof (member.lastName) !== "string") throw "firstName and lastName inside band members must be strings";
    }
    if (isNaN(yearFormed)) throw "year formed must be a number";
    if (yearFormed < 1900 || yearFormed >= 2019) throw "yearFormed is not in valid range";
    if (!Array.isArray(genres)) throw "genres must be given in an array";
    if (genres.length < 1) throw "there must be atleast one genre";
    if (typeof (recordLabel) !== 'string') throw "record label must be a string";
    /*
      TODO:  Add a band.  Be sure to check all input for proper TYPE, make sure input is THERE and VALID etc..
      bandName = string (can't be empty, undefined, null, a number etc..) 
      bandMembers = array of objects that contain band members first name and last name (can't be empty, undefined, null etc.. MUST have at least one band member) 
       [ {
          firstName,
          lastName
        }]
      yearFormed = number year the band formed (can't be empty, undefined, null, must be greater than or equal to 1900 less than 2019) 
      genres = array with at LEAST one element (can't be empty, undefined, null etc..) 
      recordLabel = string of the name of their record label (can't be empty, undefined, null etc..) 
      ex object:
      {
        bandName: "Pink Floyd",
        bandMembers: [
          {firstName: "Roger", lastName: "Waters"},
          {firstName: "David", lastName: "Gilmour"},
          {firstName: "Nick", lastName: "Mason"},
          {firstName: "Richard", lastName: "Wright"},
          {firstName: "Syd", lastName: "Barrett"}
        ],
        yearFormed: 1965,
        genre: ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        recordLabel: "EMI"
      }
      The function will return the newly inserted band, throw an error if the document cannot be inserted. 
    */

    const insert = {
      bandName: bandName,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
      genre: genres,
      recordLabel: recordLabel
    }

    const bandsCollection = await bands();
    const insertInfo = await bandsCollection.insertOne(insert);

    if (insertInfo.insertedCount === 0) throw "could not insert bands into database";

    return insert;
  },
  async removeBand(id) {
    // TODO: Removes a band from the DB, return the list of all bands once band has been deleted (call getAllBands())
    // id is a string/object ID, it cannot be blank, cannot be null, cannot be undefined, must be present
    //If not found or not removed, throw an error.
    if (arguments.length !== 1) throw `function removeBand() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw "id must be given in string format in function remove()";

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `invalid given id: ${id} in function remove()`;
    const bandsCollection = await bands();

    // const ani = await animalCollection.findOne({ _id: objId });
    // if (ani === null) throw new Error(`no band with given id: ${id} in function remove()`);

    const deletionInfo = await bandsCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) throw "could not remove animal sucessfully";

    return this.getAllBands();
  },
  async searchBandByName(bandName) {
    /*  
      bandName = string, can't be blank, null, undefined, a number.. etc...
      TODO: You will search the band name for the name supplied.  You will return wildcard matches..
      for example:  searchBandByName("Pink") would return "Pink Floyd", "Pink" or any band that had pink in it's name
     
      You will need to use a RegEx for this.  like so:
      let regex = new RegExp([".*", bandName, ".*"].join(""), "i");
      and then in your find query use the regex.  {"bandName": regex}
       If there are no bands found with that member then throw an error.
    */
    if (arguments.length !== 1) throw `function searchBandByName() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (bandName) !== 'string') throw "bandName must be given in string format in function searchBandByName()";

    const bandsCollection = await bands();
    const regex = new RegExp([".*", bandName, ".*"].join(""), "i");

    const band = await bandsCollection.find({ "bandName": regex }).toArray();
    if (band.length === 0) throw "error could not find any bands with given bandName";
    return band;

  },
  async searchBandMemberFullName(firstName, lastName) {
    /*  
      TODO: You will search bands by band members for the input supplied.
      This needs to be an exact match so YOU WILL NEED TO USE AN LOGICAL AND for this. .  
      
      You will return a list of bands where that person is a band member.
      for example:  Corey Taylor is the singer for Slipknot and for Stone Sour.  If both of those bands exist in your DB
      and Corey Taylor is supplied then both bands would be returned. 
      If there are no bands found with that member then throw an error.
    */
    if (arguments.length !== 2) throw `function searchBandMemberFullName() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (firstName) !== 'string') throw "firstName must be given in string format in function searchBandMemberFullName()";
    if (typeof (lastName) !== 'string') throw "lastName must be given in string format in function searchBandMemberFullName()";

    const bandsCollection = await bands();
    const band = await bandsCollection.find({ "bandMembers": { $elemMatch: { "firstName": firstName, "lastName": lastName } } }).toArray();
    if (band.length === 0) throw "error could not find any bands with given";
    return band;
  },
  async searchBandMember(name) {
    /*  
      TODO: You will search bands by band members for the input supplied.  You will return wildcard matches..
      YOU WILL NEED TO USE AN LOGICAL OR for this. 
      for example:  searchBandMember("David") would return the band objects Pink Floyd (David Gilmour is a member), Van Halen (David Lee Roth is a member) 
      or any band that had David in their first or last name.  supplying "dav" should also return
      You will need to use a RegEx for this.  like so:
      let regex = new RegExp([".*", name, ".*"].join(""), "i");
      and then in your find query use the regex.  {"bandName": regex}
      .find({  $or: [{ "firstName": regex },{ "lastName": regex } }] }).toArray();
      
      You will return a list of bands where that person is a band member.
      for example:  David would return the objects Pink Floyd and Van Halen (if those bands were in your DB)
    */
    if (arguments.length !== 1) throw `function searchBandMember() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (name) !== 'string') throw "name must be given in string format in function searchBandMember()";

    const regex = new RegExp([".*", name, ".*"].join(""), "i");

    const bandsCollection = await bands();

    const band = await bandsCollection.find({ "bandMembers": { $elemMatch: { $or: [{ "firstName": regex }, { "lastName": regex }] } } }).toArray();
    if (band.length === 0) throw "could not find any bands with given";
    return band;
  },
  async searchBandByGenre(genre) {
    /*  
      TODO: This will return an array of objects of bands where the genre passed in matches one of the genres
      YOU WILL NEED TO USE MONGO's $in for the query... 
      Throw an error if no bands found
    */
    if (arguments.length !== 1) throw `function searchBandByGenre() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (genre) !== 'string') throw "name must be given in string format in function searchBandByGenre()";

    const bandsCollection = await bands();

    const names = await bandsCollection.find({ "genre": { $in: [genre] } }).toArray();
    if (names.length === 0) throw "error could not find any bands with given";
    return names;
  },
  async searchBandByYear(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed in the year supplied
      Throw an error if no bands found
    */

    if (arguments.length !== 1) throw `function searchBandByYear() expected 1 parameters but instead received ${arguments.length}`;
    if (isNaN(year)) throw "year must be given in number format in function searchBandByYear()";

    const bandsCollection = await bands();

    const names = await bandsCollection.find({ "yearFormed": year }).toArray();
    if (names.length === 0) throw "error could not find any bands with given";
    return names;
  },
  async searchBandFormedBefore(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed before in the year supplied $lt in mongo
      Throw an error if no bands found
    */

    if (arguments.length !== 1) throw `function searchBandFormedBefore() expected 1 parameters but instead received ${arguments.length}`;
    if (isNaN(year)) throw "year must be given in number format in function searchBandFormedBefore()";

    const bandsCollection = await bands();

    const names = await bandsCollection.find({ "yearFormed": { $lt: year } }).toArray();
    if (names.length === 0) throw "error could not find any bands with given";
    return names;
  },
  async searchBandFormedOnOrBefore(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed on or before in the year supplied $lte in mongo
      Throw an error if no bands found
    */

    if (arguments.length !== 1) throw `function searchBandFormedOnOrBefore() expected 1 parameters but instead received ${arguments.length}`;
    if (isNaN(year)) throw "year must be given in number format in function searchBandFormedOnOrBefore()";

    const bandsCollection = await bands();

    const names = await bandsCollection.find({ "yearFormed": { $lte: year } }).toArray();
    if (names.length === 0) throw "error could not find any bands with given";
    return names;
  },
  async searchBandFormedAfter(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed After in the year supplied $gt in mongo
      Throw an error if no bands found
    */
    if (arguments.length !== 1) throw `function searchBandFormedAfter() expected 1 parameters but instead received ${arguments.length}`;
    if (isNaN(year)) throw "year must be given in number format in function searchBandFormedAfter()";

    const bandsCollection = await bands();

    const names = await bandsCollection.find({ "yearFormed": { $gt: year } }).toArray();
    if (names.length === 0) throw "error could not find any bands with given";
    return names;
  },
  async searchBandFormedOnOrAfter(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed on or after in the year supplied $gte in mongo
      Throw an error if no bands found
    */
    if (arguments.length !== 1) throw `function searchBandFormedOnOrAfter() expected 1 parameters but instead received ${arguments.length}`;
    if (isNaN(year)) throw "year must be given in number format in function searchBandFormedOnOrAfter()";

    const bandsCollection = await bands();

    const names = await bandsCollection.find({ "yearFormed": { $gte: year } }).toArray();
    if (names.length === 0) throw "error could not find any bands with given";
    return names;
  },
  async addBandMember(bandId, firstName, lastName) {
    /*  
      TODO: This will add a new band member object to the bandMember array
      it will return the band with the newly added member.  DO NOT ALLOW duplicates! $addToSet in Mongo...
      Throw an error if the member cannot be added
    */
    if (arguments.length !== 3) throw `function addBandMember() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (bandId) !== 'string') throw "id must be given in string format in function addBandMember()";
    if (typeof (firstName) !== 'string') throw "firstName must be given in string format in function addBandMember()";
    if (typeof (lastName) !== 'string') throw "firstName must be given in string format in function addBandMember()";

    const objId = ObjectId.createFromHexString(bandId);
    if (!ObjectId.isValid(objId)) throw `invalid given id: ${bandId} in function getBandById()`;
    const bandsCollection = await bands();

    const member = {
      firstName: firstName,
      lastName: lastName
    };

    return bandsCollection.updateOne({ _id: objId }, { $addToSet: { bandMembers: member } }).then(async function () {
      const output = await exportedMethods.getBandById(bandId);
      return output;
    });
  },
  async removeBandMember(bandId, firstName, lastName) {
    /*  
      TODO: This will remove a band member object to the bandMember array
      it will return the band with the newly removed member.
      Throw an error if the member cannot be removed
    */
    if (arguments.length !== 3) throw `function removeBandMember() expected 1 parameters but instead received ${arguments.length}`;
    if (typeof (bandId) !== 'string') throw "id must be given in string format in function removeBandMember()";
    if (typeof (firstName) !== 'string') throw "firstName must be given in string format in function removeBandMember()";
    if (typeof (lastName) !== 'string') throw "firstName must be given in string format in function removeBandMember()";

    const objId = ObjectId.createFromHexString(bandId);
    if (!ObjectId.isValid(objId)) throw `invalid given id: ${bandId} in function getBandById()`;
    const bandsCollection = await bands();

    const member = {
      firstName: firstName,
      lastName: lastName
    };

    return bandsCollection.updateOne({ _id: objId }, { $pull: { bandMembers: member } }).then(async function () {
      const output = await exportedMethods.getBandById(bandId);
      return output;
    });
  }
};

module.exports = exportedMethods;