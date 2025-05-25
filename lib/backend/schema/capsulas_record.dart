import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class CapsulasRecord extends FirestoreRecord {
  CapsulasRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "nombre" field.
  String? _nombre;
  String get nombre => _nombre ?? '';
  bool hasNombre() => _nombre != null;

  // "fecha" field.
  String? _fecha;
  String get fecha => _fecha ?? '';
  bool hasFecha() => _fecha != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _nombre = snapshotData['nombre'] as String?;
    _fecha = snapshotData['fecha'] as String?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('capsulas')
          : FirebaseFirestore.instance.collectionGroup('capsulas');

  static DocumentReference createDoc(DocumentReference parent, {String? id}) =>
      parent.collection('capsulas').doc(id);

  static Stream<CapsulasRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => CapsulasRecord.fromSnapshot(s));

  static Future<CapsulasRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => CapsulasRecord.fromSnapshot(s));

  static CapsulasRecord fromSnapshot(DocumentSnapshot snapshot) =>
      CapsulasRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static CapsulasRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      CapsulasRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'CapsulasRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is CapsulasRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createCapsulasRecordData({
  String? nombre,
  String? fecha,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'nombre': nombre,
      'fecha': fecha,
    }.withoutNulls,
  );

  return firestoreData;
}

class CapsulasRecordDocumentEquality implements Equality<CapsulasRecord> {
  const CapsulasRecordDocumentEquality();

  @override
  bool equals(CapsulasRecord? e1, CapsulasRecord? e2) {
    return e1?.nombre == e2?.nombre && e1?.fecha == e2?.fecha;
  }

  @override
  int hash(CapsulasRecord? e) =>
      const ListEquality().hash([e?.nombre, e?.fecha]);

  @override
  bool isValidKey(Object? o) => o is CapsulasRecord;
}
