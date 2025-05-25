import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class HistoriasRecord extends FirestoreRecord {
  HistoriasRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "marca" field.
  String? _marca;
  String get marca => _marca ?? '';
  bool hasMarca() => _marca != null;

  // "tienda" field.
  String? _tienda;
  String get tienda => _tienda ?? '';
  bool hasTienda() => _tienda != null;

  // "foto" field.
  String? _foto;
  String get foto => _foto ?? '';
  bool hasFoto() => _foto != null;

  void _initializeFields() {
    _marca = snapshotData['marca'] as String?;
    _tienda = snapshotData['tienda'] as String?;
    _foto = snapshotData['foto'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('historias');

  static Stream<HistoriasRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => HistoriasRecord.fromSnapshot(s));

  static Future<HistoriasRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => HistoriasRecord.fromSnapshot(s));

  static HistoriasRecord fromSnapshot(DocumentSnapshot snapshot) =>
      HistoriasRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static HistoriasRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      HistoriasRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'HistoriasRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is HistoriasRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createHistoriasRecordData({
  String? marca,
  String? tienda,
  String? foto,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'marca': marca,
      'tienda': tienda,
      'foto': foto,
    }.withoutNulls,
  );

  return firestoreData;
}

class HistoriasRecordDocumentEquality implements Equality<HistoriasRecord> {
  const HistoriasRecordDocumentEquality();

  @override
  bool equals(HistoriasRecord? e1, HistoriasRecord? e2) {
    return e1?.marca == e2?.marca &&
        e1?.tienda == e2?.tienda &&
        e1?.foto == e2?.foto;
  }

  @override
  int hash(HistoriasRecord? e) =>
      const ListEquality().hash([e?.marca, e?.tienda, e?.foto]);

  @override
  bool isValidKey(Object? o) => o is HistoriasRecord;
}
