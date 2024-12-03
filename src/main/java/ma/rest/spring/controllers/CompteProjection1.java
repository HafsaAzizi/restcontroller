package ma.rest.spring.controllers;

import ma.rest.spring.entities.Compte;

import org.springframework.data.rest.core.config.Projection;
@Projection (name = "solde", types=Compte.class)
public interface CompteProjection1 {
    public double getSolde();
}
