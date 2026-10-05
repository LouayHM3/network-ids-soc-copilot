# Model contract

`integrations/classifier.js` defines the inference contract: normalized alert features become a bounded attack-likelihood score. A production training job should persist the learned weights, evaluate precision/recall by attack family, and version the artifact alongside the index schema.
