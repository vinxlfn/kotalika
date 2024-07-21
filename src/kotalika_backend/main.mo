import Nat32 "mo:base/Nat32";
//import Nat16 "mo:base/Nat16";
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
import Option "mo:base/Option";
//import Debug "mo:base/Debug";
//import Blob "mo:base/Blob";
//import List "mo:base/List";

actor Kotalika {
  public type IdNo = Nat32;
  public type Advs = {
    title : Text;
    specification : Text;
    category : Text;
    img: Text;
  };

/* //getapi
type Text1 = Text;
type HeaderField = (Text, Text);

type HttpResponse = {
    status_code: Nat16;
    headers: [HeaderField];
    body: Blob;
};

type HttpRequest = {
    method: Text;
    url: Text;
    headers: [HeaderField];
    body: Blob;
  };

//getapi end */
private stable var id : IdNo = 0;

private stable var Advs : Trie.Trie<IdNo, Advs> = Trie.empty();

public func created(adv: Advs) : async IdNo {
  let id_no = id;
  id +=1;
  Advs := Trie.replace(
    Advs, 
    key(id_no),
    Nat32.equal,
    ?adv,
  ).0;
  return id_no;
};

public query func read(id_no: IdNo) : async ?Advs {
  let result = Trie.find(Advs, key(id_no), Nat32.equal);
  return result;
};

public shared query func readAll() : async [(IdNo, Advs)] {
  let resultAllData = Iter.toArray(Trie.iter(Advs));
  return resultAllData;
};

public func update(id_no: IdNo, adinput:Advs) : async Bool {
  let resultAd = Trie.find(Advs, key(id_no), Nat32.equal);
  let data = Option.isSome(resultAd);

  if (data){
    Advs := Trie.replace(
      Advs, 
      key(id_no),
      Nat32.equal,
      ?adinput,
    ).0;
  };
  return data;
};

public func delete(id_no: IdNo) : async Bool {
  let resultAd = Trie.find(Advs, key(id_no), Nat32.equal);
  let data = Option.isSome(resultAd);

  if (data){
    Advs := Trie.replace(
      Advs, 
      key(id_no),
      Nat32.equal,
      null,
    ).0;
  };
  return data;
};


//getapi
/* public query func http_request(request:  HttpRequest): async (HttpResponse) {

    let response_body : shared query () -> async [(IdNo, Advs)] = readAll;
    let response_list = List.map(response_body, func adv_data { adv_data.0 # ": " # adv_data.1 });
    let response_text = List.join(response_list, "\n");
    let body = Text.encodeUtf8(response_text);
    
    if (request.url == "hello") {
        return {
            status_code = 200;
            headers = [("Content-Type", "text/html")];
            body = body;

        };
    };
        return {
            status_code = 404;
            headers = [];
            body = Text.encodeUtf8("404 Not found :");
    };
}; */
//getapi end

private func key (x: IdNo) : Trie.Key<IdNo>{
  return {hash = x; key = x };
};

};