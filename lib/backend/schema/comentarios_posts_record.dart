import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ComentariosPostsRecord extends FirestoreRecord {
  ComentariosPostsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "autor" field.
  String? _autor;
  String get autor => _autor ?? '';
  bool hasAutor() => _autor != null;

  // "id_post" field.
  String? _idPost;
  String get idPost => _idPost ?? '';
  bool hasIdPost() => _idPost != null;

  // "comentario" field.
  String? _comentario;
  String get comentario => _comentario ?? '';
  bool hasComentario() => _comentario != null;

  // "fecha" field.
  DateTime? _fecha;
  DateTime? get fecha => _fecha;
  bool hasFecha() => _fecha != null;

  // "foto_autor" field.
  String? _fotoAutor;
  String get fotoAutor => _fotoAutor ?? '';
  bool hasFotoAutor() => _fotoAutor != null;

  // "alias_autor" field.
  String? _aliasAutor;
  String get aliasAutor => _aliasAutor ?? '';
  bool hasAliasAutor() => _aliasAutor != null;

  // "likes" field.
  List<DocumentReference>? _likes;
  List<DocumentReference> get likes => _likes ?? const [];
  bool hasLikes() => _likes != null;

  // "id_autor" field.
  DocumentReference? _idAutor;
  DocumentReference? get idAutor => _idAutor;
  bool hasIdAutor() => _idAutor != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _autor = snapshotData['autor'] as String?;
    _idPost = snapshotData['id_post'] as String?;
    _comentario = snapshotData['comentario'] as String?;
    _fecha = snapshotData['fecha'] as DateTime?;
    _fotoAutor = snapshotData['foto_autor'] as String?;
    _aliasAutor = snapshotData['alias_autor'] as String?;
    _likes = getDataList(snapshotData['likes']);
    _idAutor = snapshotData['id_autor'] as DocumentReference?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('comentarios_posts')
          : FirebaseFirestore.instance.collectionGroup('comentarios_posts');

  static DocumentReference createDoc(DocumentReference parent, {String? id}) =>
      parent.collection('comentarios_posts').doc(id);

  static Stream<ComentariosPostsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ComentariosPostsRecord.fromSnapshot(s));

  static Future<ComentariosPostsRecord> getDocumentOnce(
          DocumentReference ref) =>
      ref.get().then((s) => ComentariosPostsRecord.fromSnapshot(s));

  static ComentariosPostsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ComentariosPostsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ComentariosPostsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ComentariosPostsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ComentariosPostsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ComentariosPostsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createComentariosPostsRecordData({
  String? autor,
  String? idPost,
  String? comentario,
  DateTime? fecha,
  String? fotoAutor,
  String? aliasAutor,
  DocumentReference? idAutor,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'autor': autor,
      'id_post': idPost,
      'comentario': comentario,
      'fecha': fecha,
      'foto_autor': fotoAutor,
      'alias_autor': aliasAutor,
      'id_autor': idAutor,
    }.withoutNulls,
  );

  return firestoreData;
}

class ComentariosPostsRecordDocumentEquality
    implements Equality<ComentariosPostsRecord> {
  const ComentariosPostsRecordDocumentEquality();

  @override
  bool equals(ComentariosPostsRecord? e1, ComentariosPostsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.autor == e2?.autor &&
        e1?.idPost == e2?.idPost &&
        e1?.comentario == e2?.comentario &&
        e1?.fecha == e2?.fecha &&
        e1?.fotoAutor == e2?.fotoAutor &&
        e1?.aliasAutor == e2?.aliasAutor &&
        listEquality.equals(e1?.likes, e2?.likes) &&
        e1?.idAutor == e2?.idAutor;
  }

  @override
  int hash(ComentariosPostsRecord? e) => const ListEquality().hash([
        e?.autor,
        e?.idPost,
        e?.comentario,
        e?.fecha,
        e?.fotoAutor,
        e?.aliasAutor,
        e?.likes,
        e?.idAutor
      ]);

  @override
  bool isValidKey(Object? o) => o is ComentariosPostsRecord;
}
