import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class CategoriaInternaRecord extends FirestoreRecord {
  CategoriaInternaRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "categoria" field.
  String? _categoria;
  String get categoria => _categoria ?? '';
  bool hasCategoria() => _categoria != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _categoria = snapshotData['categoria'] as String?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('categoria_interna')
          : FirebaseFirestore.instance.collectionGroup('categoria_interna');

  static DocumentReference createDoc(DocumentReference parent, {String? id}) =>
      parent.collection('categoria_interna').doc(id);

  static Stream<CategoriaInternaRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => CategoriaInternaRecord.fromSnapshot(s));

  static Future<CategoriaInternaRecord> getDocumentOnce(
          DocumentReference ref) =>
      ref.get().then((s) => CategoriaInternaRecord.fromSnapshot(s));

  static CategoriaInternaRecord fromSnapshot(DocumentSnapshot snapshot) =>
      CategoriaInternaRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static CategoriaInternaRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      CategoriaInternaRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'CategoriaInternaRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is CategoriaInternaRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createCategoriaInternaRecordData({
  String? categoria,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'categoria': categoria,
    }.withoutNulls,
  );

  return firestoreData;
}

class CategoriaInternaRecordDocumentEquality
    implements Equality<CategoriaInternaRecord> {
  const CategoriaInternaRecordDocumentEquality();

  @override
  bool equals(CategoriaInternaRecord? e1, CategoriaInternaRecord? e2) {
    return e1?.categoria == e2?.categoria;
  }

  @override
  int hash(CategoriaInternaRecord? e) =>
      const ListEquality().hash([e?.categoria]);

  @override
  bool isValidKey(Object? o) => o is CategoriaInternaRecord;
}
