import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class GaleriaFotosRecord extends FirestoreRecord {
  GaleriaFotosRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "foto" field.
  String? _foto;
  String get foto => _foto ?? '';
  bool hasFoto() => _foto != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _foto = snapshotData['foto'] as String?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('galeria_fotos')
          : FirebaseFirestore.instance.collectionGroup('galeria_fotos');

  static DocumentReference createDoc(DocumentReference parent, {String? id}) =>
      parent.collection('galeria_fotos').doc(id);

  static Stream<GaleriaFotosRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => GaleriaFotosRecord.fromSnapshot(s));

  static Future<GaleriaFotosRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => GaleriaFotosRecord.fromSnapshot(s));

  static GaleriaFotosRecord fromSnapshot(DocumentSnapshot snapshot) =>
      GaleriaFotosRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static GaleriaFotosRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      GaleriaFotosRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'GaleriaFotosRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is GaleriaFotosRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createGaleriaFotosRecordData({
  String? foto,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'foto': foto,
    }.withoutNulls,
  );

  return firestoreData;
}

class GaleriaFotosRecordDocumentEquality
    implements Equality<GaleriaFotosRecord> {
  const GaleriaFotosRecordDocumentEquality();

  @override
  bool equals(GaleriaFotosRecord? e1, GaleriaFotosRecord? e2) {
    return e1?.foto == e2?.foto;
  }

  @override
  int hash(GaleriaFotosRecord? e) => const ListEquality().hash([e?.foto]);

  @override
  bool isValidKey(Object? o) => o is GaleriaFotosRecord;
}
