import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class PostsRecord extends FirestoreRecord {
  PostsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "portada" field.
  String? _portada;
  String get portada => _portada ?? '';
  bool hasPortada() => _portada != null;

  // "info" field.
  String? _info;
  String get info => _info ?? '';
  bool hasInfo() => _info != null;

  // "nombre" field.
  String? _nombre;
  String get nombre => _nombre ?? '';
  bool hasNombre() => _nombre != null;

  // "logo" field.
  String? _logo;
  String get logo => _logo ?? '';
  bool hasLogo() => _logo != null;

  // "perfil_alias" field.
  String? _perfilAlias;
  String get perfilAlias => _perfilAlias ?? '';
  bool hasPerfilAlias() => _perfilAlias != null;

  // "id_posts" field.
  String? _idPosts;
  String get idPosts => _idPosts ?? '';
  bool hasIdPosts() => _idPosts != null;

  // "users_saved" field.
  List<String>? _usersSaved;
  List<String> get usersSaved => _usersSaved ?? const [];
  bool hasUsersSaved() => _usersSaved != null;

  // "users_liked" field.
  List<bool>? _usersLiked;
  List<bool> get usersLiked => _usersLiked ?? const [];
  bool hasUsersLiked() => _usersLiked != null;

  // "id_autor_post" field.
  String? _idAutorPost;
  String get idAutorPost => _idAutorPost ?? '';
  bool hasIdAutorPost() => _idAutorPost != null;

  // "likes" field.
  List<DocumentReference>? _likes;
  List<DocumentReference> get likes => _likes ?? const [];
  bool hasLikes() => _likes != null;

  // "guardados_capsulas" field.
  List<DocumentReference>? _guardadosCapsulas;
  List<DocumentReference> get guardadosCapsulas =>
      _guardadosCapsulas ?? const [];
  bool hasGuardadosCapsulas() => _guardadosCapsulas != null;

  // "seguidores" field.
  DocumentReference? _seguidores;
  DocumentReference? get seguidores => _seguidores;
  bool hasSeguidores() => _seguidores != null;

  void _initializeFields() {
    _portada = snapshotData['portada'] as String?;
    _info = snapshotData['info'] as String?;
    _nombre = snapshotData['nombre'] as String?;
    _logo = snapshotData['logo'] as String?;
    _perfilAlias = snapshotData['perfil_alias'] as String?;
    _idPosts = snapshotData['id_posts'] as String?;
    _usersSaved = getDataList(snapshotData['users_saved']);
    _usersLiked = getDataList(snapshotData['users_liked']);
    _idAutorPost = snapshotData['id_autor_post'] as String?;
    _likes = getDataList(snapshotData['likes']);
    _guardadosCapsulas = getDataList(snapshotData['guardados_capsulas']);
    _seguidores = snapshotData['seguidores'] as DocumentReference?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('posts');

  static Stream<PostsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => PostsRecord.fromSnapshot(s));

  static Future<PostsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => PostsRecord.fromSnapshot(s));

  static PostsRecord fromSnapshot(DocumentSnapshot snapshot) => PostsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static PostsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      PostsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'PostsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is PostsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createPostsRecordData({
  String? portada,
  String? info,
  String? nombre,
  String? logo,
  String? perfilAlias,
  String? idPosts,
  String? idAutorPost,
  DocumentReference? seguidores,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'portada': portada,
      'info': info,
      'nombre': nombre,
      'logo': logo,
      'perfil_alias': perfilAlias,
      'id_posts': idPosts,
      'id_autor_post': idAutorPost,
      'seguidores': seguidores,
    }.withoutNulls,
  );

  return firestoreData;
}

class PostsRecordDocumentEquality implements Equality<PostsRecord> {
  const PostsRecordDocumentEquality();

  @override
  bool equals(PostsRecord? e1, PostsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.portada == e2?.portada &&
        e1?.info == e2?.info &&
        e1?.nombre == e2?.nombre &&
        e1?.logo == e2?.logo &&
        e1?.perfilAlias == e2?.perfilAlias &&
        e1?.idPosts == e2?.idPosts &&
        listEquality.equals(e1?.usersSaved, e2?.usersSaved) &&
        listEquality.equals(e1?.usersLiked, e2?.usersLiked) &&
        e1?.idAutorPost == e2?.idAutorPost &&
        listEquality.equals(e1?.likes, e2?.likes) &&
        listEquality.equals(e1?.guardadosCapsulas, e2?.guardadosCapsulas) &&
        e1?.seguidores == e2?.seguidores;
  }

  @override
  int hash(PostsRecord? e) => const ListEquality().hash([
        e?.portada,
        e?.info,
        e?.nombre,
        e?.logo,
        e?.perfilAlias,
        e?.idPosts,
        e?.usersSaved,
        e?.usersLiked,
        e?.idAutorPost,
        e?.likes,
        e?.guardadosCapsulas,
        e?.seguidores
      ]);

  @override
  bool isValidKey(Object? o) => o is PostsRecord;
}
